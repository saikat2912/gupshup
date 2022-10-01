

//import { initializeApp } from 'firebase/app';
//import firebase from "firebase/compat/app";
// Other libraries might need to also be prefixed with "compat":
//import "firebase/compat/auth";
//import auth from "firebase/auth";
//import db from "firebase/database";

//import {...} from "firebase/functions";
//import {...} from "firebase/storage";
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import { getFirestore, collection, getDocs } from 'firebase/firestore';
//import {db} from "firebase/database";

// Then you can then use the old interface, with version 9:


const firebaseConfig = {
    apiKey: "AIzaSyCJncew0Nb5vHLQ6IfL6ohmtOqcwUOBZbs",
    authDomain: "gupshup-ae043.firebaseapp.com",
    projectId: "gupshup-ae043",
    storageBucket: "gupshup-ae043.appspot.com",
    messagingSenderId: "1080118124181",
    appId: "1:1080118124181:web:49f5821d5cfe267f2d459c",
    measurementId: "G-693395XDBQ"
  };
  const app = initializeApp(firebaseConfig);
  export const db=getFirestore(app);
  export const auth= getAuth(app);
  export const provider=new GoogleAuthProvider();



