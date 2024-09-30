import { Router } from "express";
import { loginUser } from '../controllers/login.controller.js';
import { getAllAlbums } from '../controllers/albums.controller.js';
import { registerUser } from '../controllers/register.controller.js' 
import { authenticateToken } from "../middlewares/auth.js";
import { uploadFile } from '../controllers/uploads.controller.js'

const router = Router();

router.get("/albums", getAllAlbums);
router.post("/login", loginUser);
router.post("/register", registerUser)
router.post("/upload", uploadFile);


// Controles comunes de CRUD
// import { getEmails, updateEmail, getEmailById, fetchEmailsByType, createEmail, deleteEmail, answerEmail } from '../controllers/correos.mongo.controller.js'

// Controles específicos
// import { getEmailByUserId, getEmailByAsunto } from '../controllers/correos.mongo.controller.js'

// import { getLanding } from "../controllers/landing.controller.js";



// api/v1/mongo/...

// router.get('/json-data',                getLanding);

// router.get('/correos',                  getEmails)
// router.get('/correos',                  fetchEmailsByType),
// router.get('/correos/:id',              getEmailById),

// router.post('/correos',         answerEmail)
// router.post('/correos',                 createEmail),
// router.delete('/correos/:id',           deleteEmail),
// router.patch('/correos/:id',            updateEmail)
// rutas específicas

// Quiero correos de un usuario específico
// router.get('/correos/user/:userid',      getEmailByUserId)

// Quiero correos con un asunto similar al texto ":asunto"
// router.get('/correos/asunto/:asunto',    getEmailByAsunto)

export default router;