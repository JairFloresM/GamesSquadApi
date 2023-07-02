const { Router } = require('express');
const router = Router();

const { verifyToken, isAdmin } = require('../middlewares/authJwt')

// Controladores
const {
    getRegiones,
    getRegion,
    createRegion,
    deleteRegion,
    updateRegion
} = require('../controllers/region.controller.js');


// Rutas

// OBTENER TODOS LAS REGIONES
router.get('/region', [verifyToken, isAdmin], getRegiones)

// OBTENER UNA REGION
router.get('/region/:id', [verifyToken, isAdmin], getRegion)

// CREAR UNA REGION
router.post('/region', [verifyToken, isAdmin], createRegion)

// ACTUALIZAR UNA REGION
router.put('/region/:id', [verifyToken, isAdmin], updateRegion)



module.exports = router;
