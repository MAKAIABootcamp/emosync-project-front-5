// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB6DVh05DpcO2FED6qJYNl-hjSYZu2KPXw",
  authDomain: "emosync-d2f42.firebaseapp.com",
  projectId: "emosync-d2f42",
  storageBucket: "emosync-d2f42.appspot.com",
  messagingSenderId: "154095477229",
  appId: "1:154095477229:web:00b0e8eab70434cef547e4"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
export const firebaseDB = getFirestore(firebaseApp)
export const firebaseStorage = getStorage(firebaseApp)
const analytics = getAnalytics(firebaseApp);
