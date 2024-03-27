// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDTFNw3BLzPeAx5pbaprcTfqq9wQ0FZREc",
  authDomain: "auth-7e3a9.firebaseapp.com",
  projectId: "auth-7e3a9",
  storageBucket: "auth-7e3a9.appspot.com",
  messagingSenderId: "1021007687940",
  appId: "1:1021007687940:web:d1ee2da2db563c1f6a6051",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
