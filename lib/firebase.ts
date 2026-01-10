// lib/firebase.ts
import { initializeApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDxlDZmeEc50xKQ-WlhgxWSC8VGRCZpZrg",
  authDomain: "eaglex-9749b.firebaseapp.com",
  projectId: "eaglex-9749b",
  storageBucket: "eaglex-9749b.firebasestorage.app",
  messagingSenderId: "230059429044",
  appId: "1:230059429044:web:e5ffb28d79e0626e58dbe1",
  measurementId: "G-DKKBZ7B0SC"
};

// Initialize Firebase (only if not already initialized)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Analytics (only in browser)
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

// Initialize Auth
export const auth = getAuth(app);

// Initialize Firestore
export const db = getFirestore(app);

export { app, analytics };