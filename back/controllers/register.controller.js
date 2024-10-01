import { connectDB } from '../data/mongodb.js';
import { User } from '../data/mongodb.js';
import bcrypt from 'bcrypt';

// Conectar a la base de datos
connectDB();

export const registerUser = async (req, res, next) => {
    try {
        const { email, password, nombre, image = "https://picsum.photos/200/300" } = req.body;

        console.log("Datos recibidos:", req.body);

        // Verificar si faltan campos requeridos
        if (!email || !password || !nombre) {
            return res.status(400).json({ message: "Faltan datos requeridos", success: false });
        }

        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "El usuario ya existe", success: false });
        }

        // Hashear la contraseña
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Crear un nuevo usuario
        const newUser = new User({
            email,
            password: hashedPassword,
            nombre,
            image
        });

        // Guardar el usuario en la base de datos
        await newUser.save();

        // Crear una respuesta exitosa
        console.log("Usuario registrado exitosamente:", newUser);
        res.status(201).json({
            data: newUser,
            message: "Registro completo",
            success: true
        });
    } catch (error) {
        console.error("Error al registrar el usuario:", error);
        next(error); // Usar next para manejar el error adecuadamente en el middleware
    }
};
