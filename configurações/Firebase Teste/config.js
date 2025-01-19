// Import the functions you need from the SDKs you need
import { initializeApp  } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import firebase from "firebase/compat/app"
import "firebase/compat/auth";
import {collection, getDocs} from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  /*
  apiKey: "AIzaSyAPJmPDvsaFKOfsM718BrcvTwyL5HOYqcQ",
  authDomain: "teste-7de6b.firebaseapp.com",
  databaseURL: "https://teste-7de6b-default-rtdb.firebaseio.com",
  projectId: "teste-7de6b",
  storageBucket: "teste-7de6b.appspot.com",
  messagingSenderId: "956290569376",
  appId: "1:956290569376:web:8f4cff2a41956edb4de5c5",
  measurementId: "G-3Z1HFDZELX"
  */
  apiKey: "AIzaSyAhk9dtkJh6c2dLp24Q5nrO6bLdKaYZuBU",
  authDomain: "smabdteste.firebaseapp.com",
  projectId: "smabdteste",
  storageBucket: "smabdteste.firebasestorage.app",
  messagingSenderId: "375397560478",
  appId: "1:375397560478:web:979b667d38e8131af78b8f",
  measurementId: "G-LFTCM11WZ3"
  
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Iniciando o Firestore
const firebaseBD = getFirestore(app)

firebase.initializeApp(firebaseConfig);

const auth = getAuth(app);

export {firebase, firebaseBD}
