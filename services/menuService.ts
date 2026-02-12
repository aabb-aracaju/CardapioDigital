
import { 
  collection, 
  getDocs, 
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
import { db, storage } from "./firebaseConfig";
import { MenuItem } from "../types";

const COLLECTION_NAME = 'menu_bella_vista';

export const menuService = {
  // Escuta alterações em tempo real com tratamento de erro
  subscribeToMenu: (onSuccess: (items: MenuItem[]) => void, onError: (error: any) => void) => {
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
    try {
      if (base64Image.startsWith('http')) return base64Image;
      const storageRef = ref(storage, `menu/${itemId}.jpg`);
      await uploadString(storageRef, base64Image, 'data_url');
      return await getDownloadURL(storageRef);
    } catch (error: any) {
      console.error("Erro no upload da imagem:", error);
      // Repassa erro mais amigável
      if (error.code === 'storage/unauthorized') {
         throw new Error("Permissão negada no Storage (Imagens). Verifique as Regras no Firebase.");
      }
      if (error.code === 'storage/object-not-found' || error.code === 'storage/bucket-not-found') {
        throw new Error("Bucket de Storage não encontrado. Ative o Storage no Console do Firebase.");
      }
      throw new Error("Falha ao enviar imagem. Verifique se o Storage está ativado.");
    }
  },

  upsertItem: async (item: MenuItem) => {
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
        throw new Error("Permissão negada no Banco de Dados. Verifique as Regras do Firestore.");
      }
      // Se já tratamos o erro acima (ex: imagem), só repassa
      if (error.message) throw error;
      throw new Error("Erro desconhecido ao salvar. Tente novamente.");
    }
  },

  deleteItem: async (id: string) => {
    const itemRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(itemRef);
  }
};
