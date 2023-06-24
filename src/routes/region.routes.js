const { Router } = require('express');
const router = Router();


// Controladores
const {
    getRegiones,
    getRegion,
    createRegion,
    deleteRegion
} = require('../controllers/region.controller.js');


// Rutas

// OBTENER TODOS LAS REGIONES
router.get('/region', getRegiones)

// OBTENER UNA REGION
router.get('/region/:id', getRegion)

// CREAR UNA REGION
router.post('/region', createRegion)

// borrar UNA REGION
router.delete('/region/:id', deleteRegion)

module.exports = router;
