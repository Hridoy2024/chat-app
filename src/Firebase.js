// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyACu-eaYxwy_cZSpiG8btqHMrM_T8bhYK4",
  authDomain: "fir-c4df7.firebaseapp.com",
  projectId: "fir-c4df7",
  storageBucket: "fir-c4df7.appspot.com",
  messagingSenderId: "917197334137",
  appId: "1:917197334137:web:d9dc33ccfad54814b1d6a8"
};

// Initialize Firebase
 export const config = initializeApp(firebaseConfig);
 export const db = getFirestore(config);