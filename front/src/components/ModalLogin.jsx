import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Para redirigir después de iniciar sesión
import '../css/modal.css';

const ModalLogin = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  if (!isOpen) return null; // No renderizar el modal si no está abierto

  const handleClickOutside = (e) => {
    if (e.target.className === 'modalOverlay') {
      onClose(); // Cerrar el modal cuando se hace clic fuera
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/API/v1/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      }, );

      const data = await response.json();
      if (data.success) {
        localStorage.setItem('authToken', data.token);
        navigate('/inbox');
        onClose(); // Cerrar el modal después del login exitoso
      } else {
        setError(data.msg);
      }
    } catch (error) {
      setError('Error en el login.');
    }
  };

  return (
    <div className="modalOverlay" onClick={handleClickOutside}>
      <div className="modalContainer">
        <h3>Log In</h3>
        <form onSubmit={handleLogin}>
          <div className="emailInput">
            <p>Introduce tu email</p>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="passwordInput">
            <p>Introduce tu contraseña</p>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="errorText">{error}</p>}
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default ModalLogin;
