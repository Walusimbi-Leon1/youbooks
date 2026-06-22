import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, getDocs, getDoc, addDoc, deleteDoc, query, orderBy, limit } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAPs3eEGejFCaFgDVkHCCwBhW4QvrmelFo",
  authDomain: "sgssbooks.firebaseapp.com",
  databaseURL: "https://sgssbooks-default-rtdb.firebaseio.com",
  projectId: "sgssbooks",
  storageBucket: "sgssbooks.firebasestorage.app",
  messagingSenderId: "509240865956",
  appId: "1:509240865956:web:8ced886e452b652e6e2231"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export {
  db, auth,
  collection, doc, getDocs, getDoc, addDoc, deleteDoc, query, orderBy, limit,
  signInWithEmailAndPassword, signOut, onAuthStateChanged,
};
