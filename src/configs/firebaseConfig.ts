import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAzeXkQmYLdoOkgfgaSsyP0hCMECKEpXd8",
  authDomain: "dota-dd5dd.firebaseapp.com",
  projectId: "dota-dd5dd",
  storageBucket: "dota-dd5dd.firebasestorage.app",
  messagingSenderId: "1039762081728",
  appId: "1:1039762081728:web:9fa3cc4bbe01afb97b2a25",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app, "(default)");
export const analytics = getAnalytics(app);
export const storageBucket = getStorage(app);
