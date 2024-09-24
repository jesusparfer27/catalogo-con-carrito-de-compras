import { useState, useEffect } from 'react';
import { useModal } from '../context/ModalContext';
import { useNavigate } from 'react-router-dom'; // Para redirigir después de iniciar sesión
import '../css/modal.css';

const ModalLogin = () => {

    // const { closeModal } = useModal();
    // const [canSubmit, setCanSubmit] = useState(false)
    // const [formData, setFormData] = useState({
    //     username: "",
    //     password: "",
    //     name: "",
    //     tyc: false,
    //     image: ""
    // });

    // useEffect(() => {
    //     setCanSubmit(formData.name && formData.username)
    // })

    // const navigate = useNavigate()

    // const handleChange = (e) => {
    //     const { name, value, type, checked } = e.target; // deconstrucción

    //     setFormData({
    //         ...formData,
    //         [name]: type == "checkbox" ? checked = value
    //     });
    // }

    // const handleSumbmit = (e) => {
    //     e.preventDefault()
    //     navigate("/Catalogo")
    // }

    // return (
    //     <form onSubmit={handleSumbmit}>
    //         <h1>Login</h1>

    //         <input onChange={handleChange} type='email' value={formData.username} name="username" required />
    //         <input onChange={handleChange} type='password' value={formData.password} name="password" rquired />



    //         <label htmlFor="">
    //             <input onChange={handleChange} value="login" required />
    //         </label>

    //         {canSubmit ? <button disabled></button>
    //         }

    //         <input type="submit" value={checkbox} /> Acepto TyC
    //     </form>
    // )

        const { closeModal } = useModal();
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [error, setError] = useState('');
        const navigate = useNavigate();

        const handleClickOutside = (e) => {
            if (e.target.className === 'modalOverlay') {
                closeModal();
            }
        };

        // Función para manejar el login
        const handleLogin = async (e) => {
            e.preventDefault(); // Prevenir el comportamiento predeterminado del formulario
            try {
                const response = await fetch('http://localhost:3001/API/v1/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password }) // Pasar email y password
                });

                const data = await response.json();
                if (data.success) {
                    // Guarda el token en localStorage
                    localStorage.setItem('authToken', data.token);

                    // Redirige a la bandeja de entrada o cualquier otra ruta
                    navigate('/inbox'); // Redirige a la página de recibidos
                    closeModal(); // Cerrar el modal después del login exitoso
                } else {
                    setError(data.msg); // Mostrar mensaje de error en la interfaz
                }
            } catch (error) {
                console.error("Error en el login:", error);
                setError('Ocurrió un error al iniciar sesión. Inténtalo de nuevo.'); // Mensaje de error en caso de fallo
            }
        };

        return (
            <div className="modalOverlay" onClick={handleClickOutside}>
                <article className="modalContainer">
                    <h3>Log In</h3>
                    <form onSubmit={handleLogin}> {/* Se pasa handleLogin aquí */}
                        <div className="emailInput">
                            <p>Introduce your email</p>
                            <input
                                type="text"
                                className={`logInInput ${error ? 'inputError' : ''}`}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="passwordInput">
                            <p>Introduce your password</p>
                            <input
                                type="password"
                                className={`logInInput ${error ? 'inputError' : ''}`}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        {error && <p className="errorText">{error}</p>}
                        <button type="submit">Login</button>
                    </form>
                </article>
            </div>
        );
};

export default ModalLogin;
