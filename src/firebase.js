// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD6G_4wwgBwzaNvlNx9t9rMiMoRKhBCmd4",
  authDomain: "project-desweb-b5c07.firebaseapp.com",
  projectId: "project-desweb-b5c07",
  storageBucket: "project-desweb-b5c07.appspot.com",
  messagingSenderId: "75131841052",
  appId: "1:75131841052:web:5bfbbe97a9a6d57a004dd9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {auth, db };