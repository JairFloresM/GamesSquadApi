const { Router } = require('express');
const router = Router();


// Controladores
const {
    addDetalleCompra,
    getDetalleCompra
} = require('../controllers/detalle_compra.controller.js');


// Rutas

// OBTENER DETALLE COMPRA
router.get('/detalle-compra/:id', getDetalleCompra)

// AGREGAR CARRITO
router.post('/detalle-compra/:id', addDetalleCompra)




module.exports = router;
