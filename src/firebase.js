import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC8UHMG2PROL8H3x-uU1bU1Mp2DQn0uiEw",
  authDomain: "auth-746a5.firebaseapp.com",
  projectId: "auth-746a5",
  storageBucket: "auth-746a5.appspot.com",
  messagingSenderId: "1013640274798",
  appId: "1:1013640274798:web:d362bde766c1e3e7d4d77f",
  measurementId: "G-5639MW0HFN",
};

const firebaseapp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();
const facebookProvider = new firebase.auth.FacebookAuthProvider();

export { auth, googleProvider, facebookProvider };
