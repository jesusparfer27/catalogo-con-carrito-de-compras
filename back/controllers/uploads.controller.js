import { FULL_DOMAIN } from "../config/mongo.config.js";
import multer from 'multer'; // asegúrate de que 'multer' está importado

const upload = multer({ dest: 'uploads/' }); // configuración básica de multer

export const uploadFile = (req, res, next) => {
    upload.single("avatar")(req, res, (err) => {
        if (err) {
            return res.status(500).json({
                mensaje: "Error al subir el archivo",
                error: err.message
            });
        }

        console.log("Archivo subido");
        console.log("file es: ", req.file); // información del archivo
        console.log("body es: ", req.body); // otros campos del formulario

        res.status(201).json({
            mensaje: "Archivo subido correctamente",
            file: req.file,
            body: req.body,
            peso: `${Math.round(req.file.size / 1024)} Kbytes`,
            url: `${FULL_DOMAIN}/uploads/${req.file.filename}`
        });
    });
};
