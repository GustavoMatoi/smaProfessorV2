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
  apiKey: "AIzaSyBT4yfcSC76YJ-edGcaopf73WMOZbrZcWw",
  authDomain: "shapemeappbdteste.firebaseapp.com",
  databaseURL: "https://shapemeappbdteste-default-rtdb.firebaseio.com",
  projectId: "shapemeappbdteste",
  storageBucket: "shapemeappbdteste.appspot.com",
  messagingSenderId: "907185536450",
  appId: "1:907185536450:web:607af8bcd488edcce0ea5b",
  measurementId: "G-S6T72TWE45"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Iniciando o Firestore
const firebaseBD = getFirestore(app)

firebase.initializeApp(firebaseConfig);

const auth = getAuth(app);

export {firebase, firebaseBD}