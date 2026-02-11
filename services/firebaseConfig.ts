
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js";

/**
 * 💡 COMO CORRIGIR O ERRO DE PERMISSÃO NO CONSOLE DO FIREBASE:
 * 
 * 1. Acesse: https://console.firebase.google.com/
 * 2. Selecione seu projeto: "cardapiodigital-ca519"
 * 
 * --- NO FIRESTORE ---
 * 3. Clique em "Firestore Database" no menu lateral.
 * 4. Vá na aba "Rules" (Regras).
 * 5. Substitua o conteúdo pelo código abaixo e clique em "Publicar":
 * 
 * service cloud.firestore {
 *   match /databases/{database}/documents {
 *     match /{document=**} {
 *       allow read, write: if true;
 *     }
 *   }
 * }
 * 
 * --- NO STORAGE ---
 * 6. Clique em "Storage" no menu lateral.
 * 7. Vá na aba "Rules" (Regras).
 * 8. Substitua o conteúdo pelo código abaixo e clique em "Publicar":
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
  apiKey: "AIzaSyDpcw0qza5IxfWDNeP8UgEEwCOeg0HUsCc",
  authDomain: "cardapiodigital-ca519.firebaseapp.com",
  projectId: "cardapiodigital-ca519",
  storageBucket: "cardapiodigital-ca519.firebasestorage.app",
  messagingSenderId: "733856526939",
  appId: "1:733856526939:web:7cb406d8d022cccf65457e"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
