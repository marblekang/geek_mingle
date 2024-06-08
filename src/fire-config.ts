// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBgP53zY9t162yKrTNX2877vabfqmmEIR8",
  authDomain: "geek-mingle.firebaseapp.com",
  projectId: "geek-mingle",
  storageBucket: "geek-mingle.appspot.com",
  messagingSenderId: "921196330883",
  appId: "1:921196330883:web:49ae716a1423cbbf0f40b6",
  measurementId: "G-RZQ3J4W74V",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;
