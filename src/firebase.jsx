import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCk5QThiybcVAdNLoe7A9ux8ittWjClG7s",
  authDomain: "todoapp-e6f7c.firebaseapp.com",
  projectId: "todoapp-e6f7c",
  storageBucket: "todoapp-e6f7c.appspot.com",
  messagingSenderId: "724567752074",
  appId: "1:724567752074:web:e8731f67c820abc7eb9c73",
  measurementId: "G-K3H6QGDJ0R",
};

const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
