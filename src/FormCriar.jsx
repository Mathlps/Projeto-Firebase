import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase";

export const UserForm = ({ isOpen, onClose, fetchAnotacoes }) => {
    const [titulo, setTitulo] = useState("");
    const [texto, setTexto] = useState("");

    if (!isOpen) return null; // Se não estiver aberto, não renderiza nada

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
    };

    const handleOutsideClick = (e) => {
        if (e.target.id === "modal") {
            onClose(); // Fecha o modal se clicar fora
        }
    };

    return (
        <div id="modal" className="modal" onClick={handleOutsideClick}>
            <div className="modal-content">
                <span className="close" onClick={onClose}>
                    &times;
                </span>
                <h2>Crie uma Anotação</h2>
                <div>
                    <form className="form" onSubmit={handleSubmit}>
                        <div className="input-container">
                            <input
                                type="text"
                                placeholder="Título..."
                                value={titulo}
                                onChange={(e) => setTitulo(e.target.value)}
                            />
                        </div>
                        <div className="input-container">
                            <textarea
                                placeholder="Texto..."
                                value={texto}
                                onChange={(e) => setTexto(e.target.value)}
                                className="text-area"
                            />
                        </div>
                        <button type="submit">Criar Anotação</button>
                        <p className="signup-link">
                            No account? <a href="#">Sign up</a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

