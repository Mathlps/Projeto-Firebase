import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase";
import "./Modal.css";

function Modal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [titulo, setTitulo] = useState("");
const [texto, setTexto] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!titulo || !texto) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    try {
        await addDoc(collection(db, "anotacao"), {
            titulo: titulo.trim(),
            texto: texto.trim(),
            createdAt: new Date(),
        });
        alert("Anotação criada com sucesso!");
        setTitulo("");
        setTexto("");
        fetchAnotacoes(); // Atualiza a lista de anotações
    } catch (error) {
        console.error("Erro ao criar anotação:", error);
        alert("Erro ao criar anotação. Verifique o console.");
    }
    setIsModalOpen(false);
  };


  return (
    <div className="App">
      <button onClick={() => setIsModalOpen(true)}>Open Modal</button>
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Formulário</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Nome:
                <input
                                type="text"
                                placeholder="Título..."
                                value={titulo}
                                onChange={(e) => setTitulo(e.target.value)}
                            />
              </label>
              <label>
                Texto:
                <textarea
                                placeholder="Texto..."
                                value={texto}
                                onChange={(e) => setTexto(e.target.value)}
                                className="text-area"
                            />
              </label>
              
              <button type="submit">Enviar</button>
              <button type="button" onClick={() => setIsModalOpen(false)}>
                Cancelar
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Modal;
