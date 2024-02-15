// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_APP_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
export const firebase = initializeApp(firebaseConfig);
export const auth = getAuth(firebase);
const db = getFirestore(firebase);

export default db;

/*
*
* apiKey: "AIzaSyDAxf63ROi6CkSb_SIgBCaWEfy7Qr4ddxo",
    authDomain: "solution-ef28d.firebaseapp.com",
    projectId: "solution-ef28d",
    storageBucket: "solution-ef28d.appspot.com",
    messagingSenderId: "418651655909",
    appId: "1:418651655909:web:290f32077055e64fa60e0c",
    measurementId: "G-DNNKNSL7S1"
*
*
* */
