// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB571DohuVQ9RCDX0HMqhcrPNx_-xeSJKw",
  authDomain: "react-socialmedia-demo.firebaseapp.com",
  projectId: "react-socialmedia-demo",
  storageBucket: "react-socialmedia-demo.appspot.com",
  messagingSenderId: "58850806769",
  appId: "1:58850806769:web:9d6cc7a121b1f67fa2d250",
  measurementId: "G-BEXF2PVFZB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);