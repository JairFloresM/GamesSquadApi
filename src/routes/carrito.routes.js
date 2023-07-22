const { Router } = require('express');
const router = Router();


// Controladores
const {
    getCarrito,
    sumarCantidadJuego,
    restarCantidadJuego,
    deleteJuego,
    addJuego,
    getCarritoIds
} = require('../controllers/carrito.controllers.js');


// Rutas

// OBTENER CARRITO
router.get('/carrito', getCarrito)

// OBTENER IDS DEL CARRITO
router.get('/carrito/ids', getCarritoIds)

// AGREGAR JUEGO AL CARRITO
router.post('/carrito', addJuego)

// SUMAR CANTIDAD DEL JUEGO
router.put('/carrito/sum/:id', sumarCantidadJuego)

// RESTAR CANTIDAD DEL JUEGO
router.put('/carrito/rest/:id', restarCantidadJuego)

// BORRAR JUEGO DEL CARRITO
router.delete('/carrito/:id', deleteJuego)




module.exports = router;
