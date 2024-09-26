import express from 'express'
import cors from 'cors'
import { HOST, PORT, JWT_SECRET, __dirname } from './config/mongo.config.js'
import mongoRoutes from './routes/mongodb.routes.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// Utilities
const app = express()

// Middlewares
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

// Base de datos
const users = []

const MockUsers = {
    name: 'Lucas',
    username: 'lucascox',
    password: 'lucascox124',
    image: 'https://picsum.photos/200/300'
}

// rutas
app.get('/API/v1/login', async (req, res, next) => {
    res.status(200).json({ data: users, message: 'Aquí estan tus usuarios' })
})

app.post('/API/v1/login', async (req, res, next) => {
    try {
        const {username, password} = req.body

        // Obtener el usuario recien creado
        const user = users.find( (u) => u.username === username  );

        if(!user) {
            return res.status(400).json({message: "usuario no encontrado"})
        }

        // comparamos la contraseña de la base de datos con la del login
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            return res.status(400).json({message:"Clave incorrecta"})
        // } else {
        //     return res.status(400).json({message:"user correcto"})
        } 

        console.log("User encontrado: ", user)

        // Crear and Sign a token 

        // Crear and SIGN A NEW TOKEN
        const token = jwt.sign({username:username}, JWT_SECRET, { expiresIn: '1h'})

        console.log("haciendo login")
        res.status(200).json({ data:user, message: "Login Correcto", token })
    } catch (e) {
        res.status(500).json({ error: 'Error en el servidor' })
    }
})



app.get('/API/v1/users', async (req, res, next) => {
    res.status(200).json({data: users, message: "Aqui estan los usuarios"})
})

app.get('/API/v1/admin', authenticateToken, async (req, res, next) => {
    console.log("ver contenido privado de admin")
    res.status(200).json({ data: users, message: 'Aquí estan tus usuarios' })
})


app.post('/API/v1/register', async (req, res, next) => {
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
        const user = users.find( (u) => u.username === username  );
        // const user = users.find( (u) => u.id === id  );


        console.log("haciendo register");
        res.status(200).json({ data: user, message: "Registro completo" })
    } catch (e) {
        res.status(500).json({ error: 'Error en el servidor' })
    }
})



app.get('/', (req, res) => {

    res.setHeader("Content-Type", "text/html")

    const landingHTML = `
        <h1>Bienvenidos a nuestra REST-API</h1>
        <p>Servidor uniciado en ${HOST};${PORT}</p>
    `;

    res.status(200).send(landingHTML)
})

// Rutas para mysql
// app.use("/API/v1/", apiRoutes)

// Rutas para mongoDB
// app.use('/API/v1', mongoRoutes)

// Rutas
app.listen(PORT, () => {
    console.log(`Iniciando API en ${HOST}:${PORT}`)
})