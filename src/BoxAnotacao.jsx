import React, { useState, useEffect } from "react";
import "./BoxAnotacao.css";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebase";


export const AnotacoesCard = () => {
  const [anotacoes, setAnotacoes] = useState([]);

  const anotacaoCollectionRef = collection(db, "anotacao");

  // Função para buscar as anotações
  const fetchAnotacoes = async () => {
    try {
      const data = await getDocs(anotacaoCollectionRef);
      setAnotacoes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (error) {
      console.error("Erro ao buscar anotações:", error);
    }
  };

  // Função para deletar uma anotação
  const deleteAnotacao = async (id) => {
    try {
      const anotacaoDoc = doc(db, "anotacao", id);
      await deleteDoc(anotacaoDoc);
      setAnotacoes((prev) => prev.filter((anotacao) => anotacao.id !== id)); // Atualiza a lista
      console.log("Anotação deletada");
    } catch (error) {
      console.error("Erro ao deletar anotação:", error);
    }
  };

  // useEffect para carregar anotações ao montar o componente
  useEffect(() => {
    fetchAnotacoes();
  }, [anotacoes]);

  return (
    <div>
      <div className="container">
        {anotacoes.map((anotacao) => (
          <Card key={anotacao.id} anotacao={anotacao} onDelete={deleteAnotacao} />
        ))}
      </div>
    </div>
  );
};

// Componente Card
const Card = ({ anotacao, onDelete }) => {
  return (
    <div className="cookie-card">
      <div>
        <span className="title">{anotacao.titulo}</span>
      </div>
      <div>
        <p className="description">{anotacao.texto}</p>
        <p>
          <strong>Data:</strong>{" "}
          {anotacao.createdAt
            ? anotacao.createdAt.toDate().toLocaleString()
            : "Data indisponível"}
        </p>
      </div>
      <div className="actions">
        {/* <button
          className="pref"
          onClick={() => alert("Funcionalidade 'View' ainda não implementada.")}
        >
          View
        </button> */}
        <button className="accept" onClick={() => onDelete(anotacao.id)}>
          Deletar
        </button>
      </div>
    </div>
  );
};

export default AnotacoesCard;
