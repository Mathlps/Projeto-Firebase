import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, getDocs, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCk5QThiybcVAdNLoe7A9ux8ittWjClG7s",
  authDomain: "todoapp-e6f7c.firebaseapp.com",
  projectId: "todoapp-e6f7c",
  storageBucket: "todoapp-e6f7c.appspot.com",
  messagingSenderId: "724567752074",
  appId: "1:724567752074:web:e8731f67c820abc7eb9c73",
  measurementId: "G-K3H6QGDJ0R",
};

// Inicializando o Firebase
const firebaseApp = initializeApp(firebaseConfig);

export const App = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState([]);

  const db = getFirestore(firebaseApp);
  const userCollectionRef = collection(db, "users");

  useEffect(()=>{

    const getUsers = async () => {
      const data = await getDocs(userCollectionRef);
      console.log(data)
    }
    getUsers();
  },[])

  return <h1>Hello world</h1>
}
