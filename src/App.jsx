import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, getDocs, collection, addDoc, deleteDoc, doc } from "firebase/firestore";

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

  // Função para criar usuário
  const criarUser = async () => {
    try {
      await addDoc(userCollectionRef, {
        name,
        email,
      });
      alert("Usuário criado com sucesso!");
      setName("");
      setEmail("");
      fetchUsers(); // Atualiza a lista de usuários
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      alert("Ocorreu um erro ao criar o usuário.");
    }
  };

  // Função para deletar um usuário
  const deleteUser = async (id) => {
    try {
      const userDoc = doc(db, "users", id); // Corrigido para "users"
      await deleteDoc(userDoc);
      alert("Usuário deletado com sucesso!");
      fetchUsers(); // Atualiza a lista de usuários
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
      alert("Ocorreu um erro ao deletar o usuário.");
    }
  };

  // Função para buscar usuários
  const fetchUsers = async () => {
    try {
      const data = await getDocs(userCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))); // Atualiza o estado com os dados
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  };

  // useEffect para buscar usuários ao carregar o componente
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Gerenciamento de Usuários</h1>
      <div>
        <input
          type="text"
          placeholder="Nome..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={criarUser}>Criar Usuário</button>
      </div>

      <ul>
        {users.map((user) => (
          <div key={user.id}>
            <li><strong>Nome:</strong> {user.name}</li>
            <li><strong>Email:</strong> {user.email}</li>
            <button onClick={() => deleteUser(user.id)}>Deletar</button>
          </div>
        ))}
      </ul>
    </div>
  );
};
