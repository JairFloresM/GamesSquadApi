const { Router } = require('express');
const multer = require('multer');
const router = Router();


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
const upload2 = multer();


// Rutas
// OBTENER JUEGOS
router.get('/juegos', getJuegos)

// OBTENER JUEGOS
router.get('/juegos/:id', getJuego)




// CREAR JUEGO
router.post('/juegos', postJuegos)

// CREAR LLAVES DE JUEGO
router.post('/juegos/subida-llaves', upload1.single('excelFile'), postJuegosLlaves) // excelFile es el nombre del input

// CREAR IMAGENES DE JUEGO
router.post('/juegos/subida-imagenes', upload2.array('images', 4), postJuegosImagenes)  //images es el nombre del input, 4 es el maximo de imagenes que se pueden subir

// CREAR DESCRIPCION DE JUEGO
router.post('/juegos/subida-descripcion', postJuegosDescripcion)




// ACTUALIZAR JUEGO
router.put('/juegos', updateJuegos)

// ACTUALIZAR LLAVES DE JUEGO
router.put('/juegos/subida-llaves', upload1.single('excelFile'), updateJuegosLlaves) // excelFile es el nombre del input

// ACTUALIZAR IMAGENES DE JUEGO
router.put('/juegos/subida-imagenes', upload2.array('images', 4), updateJuegosImagenes)  //images es el nombre del input, 4 es el maximo de imagenes que se pueden subir

// ACTUALIZAR DESCRIPCION DE JUEGO
router.put('/juegos/subida-descripcion', updateJuegosDescripcion)

module.exports = router;
