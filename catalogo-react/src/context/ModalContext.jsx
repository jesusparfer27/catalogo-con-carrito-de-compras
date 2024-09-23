import { createContext, useContext, useState } from 'react';

// Crea el contexto
const ModalContext = createContext();

// Hook personalizado para usar el contexto
export const useModal = () => useContext(ModalContext);

// Componente proveedor del contexto
export const ModalProvider = ({ children }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <ModalContext.Provider value={{ isModalOpen, openModal, closeModal }}>
            {children}
        </ModalContext.Provider>
    );
};
