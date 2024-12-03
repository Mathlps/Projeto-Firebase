import React from "react";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebase";

export const UserList = ({ users, onUserDeleted }) => {
  const deleteUser = async (id) => {
    try {
      const userDoc = doc(db, "users", id);
      await deleteDoc(userDoc);
      alert("Usuário deletado com sucesso!");
      onUserDeleted(); // Atualiza a lista de usuários no componente pai
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
      alert("Ocorreu um erro ao deletar o usuário.");
    }
  };

  return (
    <ul>
      {users.map((user) => (
        <div key={user.id}>
          <li><strong>Nome:</strong> {user.name}</li>
          <li><strong>Email:</strong> {user.email}</li>
          <button onClick={() => deleteUser(user.id)}>Deletar</button>
        </div>
      ))}
    </ul>
  );
};
