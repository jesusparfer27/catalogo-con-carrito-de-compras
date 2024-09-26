import { User, Email } from '../data/mongodb'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const registerUser = async (req, res, next) => {
    try {

        const { username, password, name, image = "https://picsum.photos/200/300" } = req.body;

        console.log(req.body);
        console.log(image)

        // Hash de contraseña con Bcrypt
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds)

        //  Guardar esto en la DB
        const id = Math.floor(Math.random()*10000) +1;
        const newUser = {id, username, password:hashedPassword, name, image};
        users.push(newUser)

        //  obtener el usuario recien creado
        const user = User.find( (u) => u.username === username  );
        // const user = users.find( (u) => u.id === id  );


        console.log("haciendo register");
        res.status(200).json({ data: user, message: "Registro completo" })
    } catch (e) {
        res.status(500).json({ error: 'Error en el servidor' })
    }
}