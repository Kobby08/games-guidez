import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { setupGuides } from ".";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBOy48Ig0wkmgtFFumpMzWxbcXEEgrUwbw",
  authDomain: "games-guidez-acc10.firebaseapp.com",
  projectId: "games-guidez-acc10",
  storageBucket: "games-guidez-acc10.appspot.com",
  messagingSenderId: "93018360053",
  appId: "1:93018360053:web:a10a55c4f46d06cfd69dbc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
const auth = getAuth();

// getting data collection
const colRef = collection(db, "guides");

// listen for auth state change
onAuthStateChanged(auth, (user) => {
  if (user) {
    getDocs(colRef).then((snapshot) => {
      setupGuides(snapshot.docs);
    });
  } else {
    setupGuides([]);
  }
});

// sign up
const signupForm = document.querySelector("#signup-form");
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.querySelector("#signup-email").value;
  const password = document.querySelector("#signup-password").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      const modal = document.querySelector("#modal-signup");
      M.Modal.getInstance(modal).close();
      signupForm.reset();
    })
    .catch((error) => {
      console.log(error.message);
    });
});

// log out
const logoutBtn = document.querySelector("#logout");
logoutBtn.addEventListener("click", () => {
  signOut(auth)
    .then(() => {})
    .catch((error) => {
      console.log(error.message);
    });
});

// login
const loginForm = document.querySelector("#login-form");
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = loginForm["login-email"].value;
  const password = loginForm["login-password"].value;

  signInWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      const modal = document.querySelector("#modal-login");
      M.Modal.getInstance(modal).close();
      signupForm.reset();
    })
    .catch((error) => {
      console.log(error.message);
    });
});
