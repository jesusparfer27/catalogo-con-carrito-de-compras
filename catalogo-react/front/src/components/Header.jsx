import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ModalLogin from '../components/ModalLogin'; // Importar el modal
import ConfirmLogoutModal from '../components/ConfirnLogoutModal';
import '../css/header.css'

const Header = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); // Estado para el modal de login
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = true; // Cambia esto según el estado de autenticación

  const handleLogout = () => {
    // Lógica para cerrar sesión
    setIsLogoutModalOpen(false);
    navigate('/login');
  };

  const handleNavigation = (path) => {
    if (path === '/' && isLoggedIn) {
      setIsLogoutModalOpen(true);
    } else {
      navigate(path);
    }
  };

  const openLoginModal = () => {
    setIsLoginModalOpen(true); // Abrir el modal de login
  };

  return (
    <header className="header">
      {location.pathname === '/' ? (
        <div className="header-content">
          {/* Div invisible para asegurar el espacio */}
          <div className="empty-space"></div>

          {/* Logo en el centro */}
          <div className="logo">Mi Logo</div>

          {/* Botones de login y sign-up */}
          <div className="auth-buttons">
            <button onClick={openLoginModal} className="login-btn">Login</button> {/* Llamar al modal */}
            <button onClick={() => navigate('/signup')} className="signup-btn">Sign Up</button>
          </div>
        </div>
      ) : (
        <>
          {isLoggedIn && (
            <nav>
              <ul>
                <li onClick={() => handleNavigation('/profile')}>Perfil</li>
                <li onClick={() => handleNavigation('/settings')}>Ajustes</li>
                <li onClick={() => handleNavigation('/')}>Cerrar sesión</li>
              </ul>
            </nav>
          )}
        </>
      )}

      {/* Modal de confirmación de logout */}
      <ConfirmLogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
      />

      {/* Modal de login */}
      {isLoginModalOpen && (
        <ModalLogin
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;
