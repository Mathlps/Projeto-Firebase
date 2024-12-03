import React, { useEffect, useState } from "react";
import { getDocs, collection, addDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebase";

export const Anotacoes = () => {
    const [titulo, setTitulo] = useState("");
    const [texto, setTexto] = useState("");
    const [anotacoes, setAnotacoes] = useState([]);

    const anotacaoCollectionRef = collection(db, "anotacao");

    const criarAnotacao = async () => {
        if (!titulo || !texto) {
            alert("Por favor, preencha todos os campos.");
            return;
        }
        try {
            await addDoc(anotacaoCollectionRef, { titulo, texto });
            alert("Anotação salva com sucesso!");
            setTitulo("");
            setTexto("");
            fetchAnotacoes();
        } catch (error) {
            console.error("Erro ao salvar anotação:", error);
            alert("Erro ao salvar anotação. Tente novamente.");
        }
    };

    const deleteAnotacao = async (id) => {
        try {
            const anotacaoDoc = doc(db, "anotacao", id);
            await deleteDoc(anotacaoDoc);
            alert("Anotação deletada com sucesso!");
            fetchAnotacoes();
        } catch (error) {
            console.error("Erro ao deletar anotação:", error);
            alert("Erro ao deletar anotação. Tente novamente.");
        }
    };

    const fetchAnotacoes = async () => {
        try {
            const data = await getDocs(anotacaoCollectionRef);
            setAnotacoes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        } catch (error) {
            console.error("Erro ao buscar anotações:", error);
        }
    };

    useEffect(() => {
        fetchAnotacoes();
    }, []);

    return (
        <div>
            <h1>Gerenciamento de Anotações</h1>
            <div>
                <input
                    type="text"
                    placeholder="Título..."
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                />
                <textarea
                    placeholder="Texto..."
                    value={texto}
                    onChange={(e) => setTexto(e.target.value)}
                />
                <button onClick={criarAnotacao}>Criar Anotação</button>
            </div>
            <ul>
                {anotacoes.map((anotacao) => (
                    <div key={anotacao.id}>
                        <li>
                            <strong>Título:</strong> {anotacao.titulo}
                        </li>
                        <li>
                            <strong>Texto:</strong> {anotacao.texto}
                        </li>
                        <button onClick={() => deleteAnotacao(anotacao.id)}>Deletar</button>
                    </div>
                ))}
            </ul>
        </div>
    );
};
