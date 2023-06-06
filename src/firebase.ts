// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCjmCBG7pDMLcLlyvdmB0IbbQ7ZQMOdOgo",
    authDomain: "boardgame-pp.firebaseapp.com",
    projectId: "boardgame-pp",
    storageBucket: "boardgame-pp.appspot.com",
    messagingSenderId: "385900976442",
    appId: "1:385900976442:web:63b7c977fb13f3fdaf5803",
    measurementId: "G-WBS40YJBS5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const userDatabase = getFirestore(app);
export const auth = getAuth(app)



