// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCHGXnKgxQz4N-C6fRGxCvnlqCkhJgMK0s",
    authDomain: "micro-blogging-app-react.firebaseapp.com",
    projectId: "micro-blogging-app-react",
    storageBucket: "micro-blogging-app-react.appspot.com",
    messagingSenderId: "1065722776166",
    appId: "1:1065722776166:web:e0d339d28b47bd20d1fba7",
    measurementId: "G-BDK86F01HC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
// export const emailProvider = new EmailAuthProvider();