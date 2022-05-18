// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCM7oHL8exEvaCcINXc9Y9F0qZ0I4oNdhY",
  authDomain: "react-todo-app-a6d53.firebaseapp.com",
  projectId: "react-todo-app-a6d53",
  storageBucket: "react-todo-app-a6d53.appspot.com",
  messagingSenderId: "199773489561",
  appId: "1:199773489561:web:40b6d8a4139e4327efab08"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export default auth