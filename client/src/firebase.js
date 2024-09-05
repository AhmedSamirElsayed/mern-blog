// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-e9306.firebaseapp.com",
  projectId: "mern-blog-e9306",
  storageBucket: "mern-blog-e9306.appspot.com",
  messagingSenderId: "1016163081427",
  appId: "1:1016163081427:web:968e0d9cf5fcf611560826",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
