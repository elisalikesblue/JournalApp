import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { GoogleAuthProvider } from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyALv0Xqkdgo97L2zl77Un3KbRdKzkF9LLs",
  authDomain: "reactappcurso-c09ea.firebaseapp.com",
  projectId: "reactappcurso-c09ea",
  storageBucket: "reactappcurso-c09ea.appspot.com",
  messagingSenderId: "504034122494",
  appId: "1:504034122494:web:35de35b50f8160e9b2a3af",
  measurementId: "G-DQ2HYZS5WH"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


const db = firebase.firestore();
const googleAuthProvider = new GoogleAuthProvider();

export {
    db,
    googleAuthProvider,
    firebase
}