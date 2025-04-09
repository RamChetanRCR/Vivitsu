// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAp8-8sOEYn6kWkjmCt-KuCtOJAovdQ8qo",
  authDomain: "trackmedi-578a0.firebaseapp.com",
  projectId: "trackmedi-578a0",
  storageBucket: "trackmedi-578a0.firebasestorage.app",
  messagingSenderId: "792543122169",
  appId: "1:792543122169:web:b821aea31d1fa7a2088828",
  measurementId: "G-FSQRR2KZ3D"
};
// ✅ Initialize Firebase


// ✅ Export Auth and Firestore
const app = initializeApp(firebaseConfig);

// ✅ Initialize services
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

// ✅ Export them
export { auth, db, googleProvider };