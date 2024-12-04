import React, { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "./firebase";
import Card from "./BoxAnotacao";
import "./App.css"
import Modal from "./Modal";

export const App = () => {
  const [users, setUsers] = useState([]);
  const userCollectionRef = collection(db, "users");

  // Função para buscar usuários
  const fetchUsers = async () => {
    try {
      const data = await getDocs(userCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))); // Atualiza o estado com os dados
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <div className="header-container">
        <h1 className="Title">TodoApp</h1>  
      </div>
        <Card/>
        <Modal/>
    </> 
  );
};
