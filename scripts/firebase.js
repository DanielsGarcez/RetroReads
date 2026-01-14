import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyAzQrm0ppeImY2JOueHKSiQOYl7P_NMgcY",
    authDomain: "retroreads-556a0.firebaseapp.com",
    projectId: "retroreads-556a0",
    storageBucket: "retroreads-556a0.firebasestorage.app",
    messagingSenderId: "137045514283",
    appId: "1:137045514283:web:12062091dea60a92af726e"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

const storage = getStorage(app);

export { app, db, auth, storage };
