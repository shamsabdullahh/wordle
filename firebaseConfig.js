import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Import Authentication
import { getFirestore } from "firebase/firestore"; // Firestore
import { getDatabase } from "firebase/database"; // Realtime Database

// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyBRSEYhjxQvTMRAU7tUmzrUxglzRlMd5L4",
  authDomain: "mobile-project---wordle.firebaseapp.com",
  projectId: "mobile-project---wordle",
  storageBucket: "mobile-project---wordle.appspot.com",
  messagingSenderId: "657027518456",
  appId: "1:657027518456:web:61135274156fbd7882900d",
  measurementId: "G-PMHCEYR3MW",
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Export services
export const auth = getAuth(app); // Initialize and export Firebase Authentication
export const db = getFirestore(app); // Initialize and export Firestore
export const realtimeDb = getDatabase(app); // Initialize and export Realtime Database
