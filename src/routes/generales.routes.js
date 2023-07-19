const { Router } = require('express');
const router = Router();


// Controladores
const {
    buscadorJuegos,
    buscadorJuegosCategoria,
    juegosMasVendidos,
    juegosMasRecientes
} = require('../controllers/generales.controllers.js');

const { verifyToken, isAdmin } = require('../middlewares/authJwt')

// Rutas

// BUSCADOR DE JUEGOS
router.get('/buscador/juego/:juego', [verifyToken], buscadorJuegos)

// BUSCADOR DE JUEGOS POR CATEGORIA
router.get('/buscador/categoria/:categoria', [verifyToken], buscadorJuegosCategoria)

// JUEGOS MAS VENDIDOS
router.get('/mas-vendidos', [verifyToken], juegosMasVendidos)

// JUEGOS MAS VENDIDOS
router.get('/mas-nuevos', [verifyToken], juegosMasRecientes)


module.exports = router;
