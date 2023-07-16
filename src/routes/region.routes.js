const { Router } = require('express');
const router = Router();

const { verifyToken, isAdmin } = require('../middlewares/authJwt')

const multer = require('multer');
const multerConfig = require('../config/multer.config')

// Controladores
const {
    getRegiones,
    getRegion,
    createRegion,
    deleteRegion,
    updateRegion,
    getAllRegiones,
    cambiarEstadoRegion
} = require('../controllers/region.controller.js');

const upload2 = multer(multerConfig);

// Rutas

// OBTENER TODOS LAS REGIONES
router.get('/region', [verifyToken, isAdmin], getRegiones)

// OBTENER TODAS LAS REGIONES ADMIN
router.get('/region/admin', [verifyToken, isAdmin], getAllRegiones)

// OBTENER UNA REGION
router.get('/region/:id', [verifyToken, isAdmin], getRegion)

// CREAR UNA REGION
router.post('/region', [verifyToken, isAdmin, upload2.array('images', 1)], createRegion)

// ACTUALIZAR UNA REGION
router.put('/region/:id', [verifyToken, isAdmin], updateRegion)


// ACTUALIZAR ESTADO REGION
router.put('/region/desactivar/:id', [verifyToken, isAdmin], cambiarEstadoRegion)



module.exports = router;
