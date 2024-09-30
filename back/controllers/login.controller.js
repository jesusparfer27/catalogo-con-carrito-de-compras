import { connectDB } from '../data/mongodb.js';
import { User } from '../data/mongodb.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Conectar a la base de datos
connectDB();

// Controlador de login
export const loginUser = async (req, res, next) => {
    const { email, password } = req.body;
    console.log("Procesando inicio de sesión");

    try {
        // Buscar al usuario por el correo electrónico
        const user = await User.findOne({ email });
        console.log("Usuario encontrado:", user);

        // Verificar si el usuario existe
        if (!user) {
            return res.status(401).json({
                msg: "Correo electrónico o contraseña incorrectos",
                success: false,
            });
        }

        // Comparar la contraseña ingresada con la almacenada
        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(401).json({
                msg: "Correo electrónico o contraseña incorrectos",
                success: false,
            });
        }

        // Crear y firmar un token
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET || 'secret_key', // Asegúrate de tener JWT_SECRET en tu archivo .env
            { expiresIn: '1h' }
        );

        // Respuesta exitosa con el token
        return res.status(200).json({
            msg: "Inicio de sesión exitoso",
            success: true,
            token: token,
            user: {
                id: user._id,
                email: user.email,
            }
        });

    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        return res.status(500).json({
            msg: "Error en el servidor",
            success: false,
            error: error.message,
        });
    }
};

// Definir la ruta en el archivo de rutas principal (por ejemplo, en routes.js o index.js)
// app.post('/API/v1/login', loginUser);
