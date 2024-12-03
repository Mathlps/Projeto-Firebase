import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebase";

export const UserForm = ({ onUserCreated }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const userCollectionRef = collection(db, "users");

  const criarUser = async () => {
    try {
      await addDoc(userCollectionRef, { name, email });
      alert("Usuário criado com sucesso!");
      setName("");
      setEmail("");
      onUserCreated(); // Atualiza a lista de usuários no componente pai
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      alert("Ocorreu um erro ao criar o usuário.");
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Nome..."
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email..."
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={criarUser}>Criar Usuário</button>
    </div>
  );
};
