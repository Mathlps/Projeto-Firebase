import React, { useState } from "react";
import { UserForm } from "./FormCriar";

const ButtonCriar = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Função para abrir o modal
    const openModal = () => {
        setIsModalOpen(true);
    };

    // Função para fechar o modal
    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <button onClick={openModal}>Adicionar Anotação</button>

            <UserForm isOpen={isModalOpen} onClose={closeModal} />
        </div>
    );
};

export default ButtonCriar ;
