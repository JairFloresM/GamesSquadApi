const { Router } = require('express');
const router = Router();


// Controladores
const {
    addDetalleCompra,
    getDetalleCompra
} = require('../controllers/detalle_compra.controller.js');


// Rutas

// OBTENER DETALLE COMPRA
router.get('/detalle-compra', getDetalleCompra)

// AGREGAR CARRITO
router.post('/detalle-compra', addDetalleCompra)




module.exports = router;
