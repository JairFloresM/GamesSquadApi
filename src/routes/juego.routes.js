const { Router } = require('express');
const router = Router();

const multer = require('multer');
const multerConfig = require('../config/multer.config')

const { cargar_imagen } = require('../middlewares/cargar_imagen');

// Controladores
const {
    getJuegos,
    postJuegos,
    postJuegosLlaves,
    postJuegosImagenes,
    postJuegosDescripcion,
    getJuego,
    updateJuegos,
    updateJuegosLlaves,
    updateJuegosImagenes,
    updateJuegosDescripcion,
} = require('../controllers/juegos.controllers.js');


// Multer
const upload1 = multer();
const upload2 = multer(multerConfig);


// Rutas
// OBTENER JUEGOS
router.get('/juegos', getJuegos)

// OBTENER JUEGOS
router.get('/juegos/:id', getJuego)




// CREAR JUEGO
router.post('/juegos', [upload2.array('images', 4), cargar_imagen], postJuegos)

// CREAR LLAVES DE JUEGO
router.post('/juegos/subida-llaves', upload1.single('excelFile'), postJuegosLlaves) // excelFile es el nombre del input




// ACTUALIZAR JUEGO
router.post('/juegos', [upload2.array('images', 4), cargar_imagen], postJuegos)

// ACTUALIZAR LLAVES DE JUEGO
router.post('/juegos/subida-llaves', upload1.single('excelFile'), postJuegosLlaves) // excelFile es el nombre del input



module.exports = router;
