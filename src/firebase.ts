import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCOcPy6Qtbe6q3fVky9nP1G0vA7Vq-H8D0",
  authDomain: "fs-studio-rental.firebaseapp.com",
  projectId: "fs-studio-rental",
  storageBucket: "fs-studio-rental.firebasestorage.app",
  messagingSenderId: "888351716265",
  appId: "1:888351716265:web:d28ffc60a6ba45d94fcab8",
  measurementId: "G-3KLEDWFCP6"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
