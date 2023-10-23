import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDqYxAv6krQj6hmYr4MI2DI6YyCXCAc3V4",
  authDomain: "nwitter-1ba54.firebaseapp.com",
  projectId: "nwitter-1ba54",
  storageBucket: "nwitter-1ba54.appspot.com",
  messagingSenderId: "826722352382",
  appId: "1:826722352382:web:be911dcd971c07de3eb9af"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);