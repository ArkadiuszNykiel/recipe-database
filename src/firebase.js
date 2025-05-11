// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCgmzz1nr3HeqgUjr2lcmXE01aipNfClTA",
  authDomain: "crud-d5429.firebaseapp.com",
  projectId: "crud-d5429",
  storageBucket: "crud-d5429.appspot.com",
  messagingSenderId: "315451629042",
  appId: "1:315451629042:web:14014a63263bc306b69f6b",
  measurementId: "G-3V4BBR2MF8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);