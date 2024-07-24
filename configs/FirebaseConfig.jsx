// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBCgiv4SA1_L_l61bsi0mmL1w2uAYArtDM",
  authDomain: "chat-bot-bcfc3.firebaseapp.com",
  projectId: "chat-bot-bcfc3",
  storageBucket: "chat-bot-bcfc3.appspot.com",
  messagingSenderId: "535929476411",
  appId: "1:535929476411:web:4dae1c9af329933f5d531e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);