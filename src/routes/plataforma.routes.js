const { Router } = require('express');
const router = Router();

const { cargar_imagen } = require('../middlewares/cargar_imagen');

const multer = require('multer');
const multerConfig = require('../config/multer.config')

const { verifyToken, isAdmin } = require('../middlewares/authJwt')


// Controladores
const {
    getPlataformas,
    getPlataforma,
    createPlataforma,
    deletePlataforma,
    updatePlataforma
} = require('../controllers/plataforma.controller.js');



// Multer
const upload2 = multer(multerConfig);


// Rutas

// OBTENER TODOS LAS PLATAFIORMAS
router.get('/plataforma', [verifyToken, isAdmin], getPlataformas)

// OBTENER UNA PLATAFORMA
router.get('/plataforma/:id', [verifyToken, isAdmin], getPlataforma)

// CREAR UNA PLATAFORMA
router.post('/plataforma', [verifyToken, isAdmin, upload2.array('images', 1), cargar_imagen], createPlataforma)

// ACTUALIZAR UNA PLATAFORMA
router.put('/plataforma/:id', [verifyToken, isAdmin, upload2.array('images', 1), cargar_imagen], updatePlataforma)


// borrar UNA PLATAFORMA
// router.delete('/plataforma/:id', deletePlataforma)

module.exports = router;
