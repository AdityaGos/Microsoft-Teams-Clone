
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyD6Fmasvnlg09rOAZjcljGNCP01SAzsKPo",
  authDomain: "chat-teams-97bfd.firebaseapp.com",
  projectId: "chat-teams-97bfd",
  storageBucket: "chat-teams-97bfd.appspot.com",
  messagingSenderId: "873085029607",
  appId: "1:873085029607:web:d954b614922725a43e2642"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db =getFirestore()