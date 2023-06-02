


import { initializeApp } from "firebase/app";
import { getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';


const firebaseConfig = {
  apiKey: "AIzaSyDomKEqjUN30aLmik-nISfWnR5b0gltP7o",
  authDomain: "maltimart-f8331.firebaseapp.com",
  projectId: "maltimart-f8331",
  storageBucket: "maltimart-f8331.appspot.com",
  messagingSenderId: "635107574733",
  appId: "1:635107574733:web:e52398ed05930ee20bfa84",
  measurementId: "G-T6WKH7D7DK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;