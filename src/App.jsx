import React, { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "./firebase";
import { UserForm } from "./UserForm";
import { Anotacoes } from "./Anotacao";
import Card from "./BoxAnotacao";
import { UserList } from "./UserList";

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
    <div>
      <h1>Gerenciamento de Usuários</h1>
      <UserForm onUserCreated={fetchUsers} />
      <UserList users={users} onUserDeleted={fetchUsers} />
      <Anotacoes/>
      <Card/>
    </div>

    
  );
};
