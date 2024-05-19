import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAyXXnLm83LKpRdrGKju1S7EmlcBXZRHrc",
  authDomain: "fupre-community.firebaseapp.com",
  projectId: "fupre-community",
  storageBucket: "fupre-community.appspot.com",
  messagingSenderId: "25780715499",
  appId: "1:25780715499:web:b3527c0d3e0f399b9923ae",
  measurementId: "G-8VVN8NZB37"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
