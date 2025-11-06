// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCPk4SDrY9NJxPrCWDfLmHeIEMCtDSIqKI",
    authDomain: "architecture-a09b2.firebaseapp.com",
    projectId: "architecture-a09b2",
    storageBucket: "architecture-a09b2.firebasestorage.app",
    messagingSenderId: "549807091607",
    appId: "1:549807091607:web:8d278c6bfb46bf88389ed2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)