import { User } from '../data/mongodb.js'; // Asegúrate de que la ruta sea correcta

export const loginUser = async (req, res, next) => {
    const { email, password } = req.body;
console.log("estoy en login")
    try {
        // Buscar al usuario por el correo electrónico
        const user = await User.findOne({ email });
        console.log(user)

        // Verificar si el usuario existe
        if (!user) {
            return res.status(401).json({
                msg: "Correo electrónico o contraseña incorrectos",
                success: false
            });
        }

        // Comparar la contraseña ingresada con la almacenada
        const isPasswordCorrect = user.password === password;
            console.log("hgfh",user.password)
            
            console.log(password)
        if (isPasswordCorrect) {
            res.status(200).json({
                msg: "Inicio de sesión exitoso",
                success: true
            });
        } else {
            res.status(401).json({
                msg: "Correo electrónico o contraseña incorrectos",
                success: false
            });
        }

    } catch (error) {
        console.error("Error al iniciar sesión: ", error);
        res.status(500).json({
            msg: "Error al iniciar sesión",
            success: false,
            error: error.message
        });
    }
};
