
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

/**
 * 💡 IMPORTANTE: REGRAS DE SEGURANÇA (COPIE E COLE NO CONSOLE DO FIREBASE)
 * 
 * Se você estiver vendo erro de "Missing permissions", suas regras provavelmente exigem autenticação.
 * Este app agora faz login anônimo automaticamente.
 * 
 * Certifique-se de ativar "Anonymous" em Authentication > Sign-in method no Console.
 * 
 * Regras recomendadas para este app (Firestore):
 * 
 * service cloud.firestore {
 *   match /databases/{database}/documents {
 *     match /{document=**} {
 *       allow read, write: if request.auth != null;
 *     }
 *   }
 * }
 * 
 * Regras recomendadas para Storage:
 * 
 * service firebase.storage {
 *   match /b/{bucket}/o {
 *     match /{allPaths=**} {
 *       allow read, write: if request.auth != null;
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
