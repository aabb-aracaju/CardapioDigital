
import { 
  collection, 
  doc, 
  setDoc, 
  deleteDoc, 
  onSnapshot,
  query,
  orderBy 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { 
  ref, 
  uploadString, 
  getDownloadURL 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js";
import { signInAnonymously } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { db, storage, auth } from "./firebaseConfig";
import { MenuItem } from "../types";

const COLLECTION_NAME = 'menu_bella_vista';

export const menuService = {
  // Inicializa autenticação anônima se necessário
  ensureAuth: async () => {
    if (!auth.currentUser) {
      try {
        await signInAnonymously(auth);
      } catch (error) {
        console.error("Erro na autenticação anônima:", error);
        throw error;
      }
    }
  },

  // Escuta alterações em tempo real com tratamento de erro
  subscribeToMenu: (onSuccess: (items: MenuItem[]) => void, onError: (error: any) => void) => {
    // Nota: O App.tsx deve chamar ensureAuth antes de chamar esta função para garantir
    // que o listener não falhe imediatamente por falta de permissão.
    
    const q = query(collection(db, COLLECTION_NAME), orderBy('category'));
    
    return onSnapshot(
      q, 
      (snapshot) => {
        const items = snapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
        })) as MenuItem[];
        onSuccess(items);
      },
      (error) => {
        console.error("Firestore error:", error);
        onError(error);
      }
    );
  },

  uploadImage: async (itemId: string, base64Image: string): Promise<string> => {
    await menuService.ensureAuth();
    try {
      if (base64Image.startsWith('http')) return base64Image;
      const storageRef = ref(storage, `menu/${itemId}.jpg`);
      await uploadString(storageRef, base64Image, 'data_url');
      return await getDownloadURL(storageRef);
    } catch (error: any) {
      console.error("Erro no upload da imagem:", error);
      if (error.code === 'storage/unauthorized') {
         throw new Error("Permissão negada no Storage. Verifique se as Regras permitem acesso autenticado.");
      }
      throw new Error("Falha ao enviar imagem. Verifique sua conexão.");
    }
  },

  upsertItem: async (item: MenuItem) => {
    await menuService.ensureAuth();
    try {
      let finalImage = item.image;
      
      // Se for imagem nova (base64), faz upload
      if (item.image.startsWith('data:image')) {
        finalImage = await menuService.uploadImage(item.id, item.image);
      }

      const itemRef = doc(db, COLLECTION_NAME, item.id);
      const dataToSave = { ...item, image: finalImage };
      
      await setDoc(itemRef, dataToSave);
      return dataToSave;
    } catch (error: any) {
      console.error("Erro ao salvar item:", error);
      if (error.code === 'permission-denied') {
        throw new Error("Permissão negada. Verifique se você está conectado à internet.");
      }
      if (error.message) throw error;
      throw new Error("Erro desconhecido ao salvar. Tente novamente.");
    }
  },

  deleteItem: async (id: string) => {
    await menuService.ensureAuth();
    const itemRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(itemRef);
  }
};
