// ConfirmLogoutModal.jsx
import React from 'react';

const ConfirmLogoutModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>¿Estás seguro de que quieres salir de tu cuenta?</h2>
        <div className="modal-actions">
          <button onClick={onConfirm} className="confirm-btn">Cerrar Sesión</button>
          <button onClick={onClose} className="cancel-btn">Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmLogoutModal;
