const { Router } = require('express');
const router = Router();

const multer = require('multer');
const multerConfig = require('../config/multer.config')

const { cargar_imagen } = require('../middlewares/cargar_imagen');

const { verifyToken, isAdmin } = require('../middlewares/authJwt')


// Controladores
const {
    getJuegos,
    postJuegos,
    postJuegosLlaves,
    getJuego,
    updateJuegos,
    updateJuegosLlaves,
    getJuegoLlavesAleatoria,
    cambiarEstadoJuego
} = require('../controllers/juegos.controllers.js');


// Multer
const upload1 = multer();
const upload2 = multer(multerConfig);


// Rutas
// OBTENER JUEGOS
router.get('/juegos', [verifyToken,], getJuegos)

// OBTENER JUEGOS
router.get('/juegos/:id', [verifyToken], getJuego)

// LLAVE ALERATORIA
router.get('/juegos/llave-aleatoria/:id', [verifyToken, isAdmin], getJuegoLlavesAleatoria)




// CREAR JUEGO
router.post('/juegos', [verifyToken, isAdmin, upload2.array('images', 4), cargar_imagen], postJuegos)

// CREAR LLAVES DE JUEGO
router.post('/juegos/subida-llaves', [verifyToken, isAdmin, upload1.single('excelFile')], postJuegosLlaves) // excelFile es el nombre del input




// ACTUALIZAR JUEGO
router.put('/juegos', [verifyToken, isAdmin, upload2.array('images', 4), cargar_imagen], updateJuegos)

// ACTUALIZAR LLAVES DE JUEGO
router.put('/juegos/subida-llaves', [verifyToken, isAdmin, upload1.single('excelFile')], updateJuegosLlaves) // excelFile es el nombre del input



// DESACTIVAR JUEGO
router.put('/juegos/desactivar/:id', [verifyToken, isAdmin], cambiarEstadoJuego)




module.exports = router;
