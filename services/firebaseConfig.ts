
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js";

/**
 * 💡 GUIA DE CONFIGURAÇÃO DE SEGURANÇA (RULES)
 * 
 * Se aparecer erro de "Permissão negada" ou "Sincronizando" infinito:
 * 1. Vá em https://console.firebase.google.com/
 * 2. Entre no projeto: "cardapio-6e814"
 * 
 * --- CONFIGURAR DATABASE ---
 * 3. Menu "Firestore Database" > aba "Regras" (Rules)
 * 4. Cole este código e clique em Publicar:
 * 
 * service cloud.firestore {
 *   match /databases/{database}/documents {
 *     match /{document=**} {
 *       allow read, write: if true;
 *     }
 *   }
 * }
 * 
 * --- CONFIGURAR IMAGENS (STORAGE) ---
 * 5. Menu "Storage" > aba "Regras" (Rules)
 * 6. Cole este código e clique em Publicar:
 * 
 * service firebase.storage {
 *   match /b/{bucket}/o {
 *     match /{allPaths=**} {
 *       allow read, write: if true;
 *     }
 *   }
 * }
 */

const firebaseConfig = {
  apiKey: "AIzaSyBI_Xf9GtY7fd97TlmjyivZEHohB4ySab0",
  authDomain: "cardapio-6e814.firebaseapp.com",
  projectId: "cardapio-6e814",
  storageBucket: "cardapio-6e814.firebasestorage.app",
  messagingSenderId: "112243452883",
  appId: "1:112243452883:web:4b6de2ea4920ad084b9d26"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
