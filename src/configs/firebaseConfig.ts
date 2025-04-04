import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCGiMDjo-lEqDt9Fxto23ch6twmz6JeycA",
  authDomain: "bluecastle-1fc10.firebaseapp.com",
  projectId: "bluecastle-1fc10",
  storageBucket: "bluecastle-1fc10.firebasestorage.app",
  messagingSenderId: "127380394265",
  appId: "1:127380394265:web:b119186951979a76c7f588"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app, "(default)");
export const analytics = getAnalytics(app);
export const storageBucket = getStorage(app);
