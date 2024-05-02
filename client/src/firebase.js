// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries



const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "mern-blog-ccd5f.firebaseapp.com",
    projectId: "mern-blog-ccd5f",
    storageBucket: "mern-blog-ccd5f.appspot.com",
    messagingSenderId: "630565620721",
    appId: "1:630565620721:web:f4cf12d7a9ff09af101250"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;