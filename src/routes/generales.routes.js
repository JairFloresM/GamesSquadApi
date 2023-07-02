const { Router } = require('express');
const router = Router();


// Controladores
const {
    buscadorJuegos,
    buscadorJuegosCategoria
} = require('../controllers/generales.controllers.js');


// Rutas

// BUSCADOR DE JUEGOS
router.get('/buscador/juego/:juego', buscadorJuegos)

// BUSCADOR DE JUEGOS POR CATEGORIA
router.get('/buscador/categoria/:categoria', buscadorJuegosCategoria)




module.exports = router;
