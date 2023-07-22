const { Router } = require('express');
const router = Router();


// Controladores
const {
    addDetalleCompra,
    getDetalleCompra
} = require('../controllers/detalle_compra.controller.js');

const {
    paypalOrder
} = require('../middlewares/paypal.js');

const { verifyToken, isAdmin } = require('../middlewares/authJwt')



// Rutas

// OBTENER DETALLE COMPRA
router.get('/detalle-compra', [verifyToken], getDetalleCompra)

// AGREGAR CARRITO
router.post('/detalle-compra', [verifyToken,], addDetalleCompra)

// CREAR ORDEN PAYPAL
router.post('/detalle-paypal', [verifyToken], paypalOrder)




module.exports = router;
