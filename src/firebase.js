import firebase from "firebase";
var firebaseConfig = {
  apiKey: "AIzaSyAXXw0sBbvhBI9wp2wmr9MrI9oB6Jj7OjU",
  authDomain: "auth-767e4.firebaseapp.com",
  projectId: "auth-767e4",
  storageBucket: "auth-767e4.appspot.com",
  messagingSenderId: "433253238015",
  appId: "1:433253238015:web:cb4199060e6356a1bb78ca",
  measurementId: "G-E1W8EZSLY1",
};

const firebaseapp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
export { auth };
