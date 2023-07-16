const { Router } = require('express');
const router = Router();
const { cargar_imagen } = require('../middlewares/cargar_imagen');

const multer = require('multer');
const multerConfig = require('../config/multer.config')

const { verifyToken, isAdmin } = require('../middlewares/authJwt')

// Controladores
const {
    getCategorias,
    getCategoria,
    createCategoria,
    deleteCategoria,
    updateCategoria,
    getAllCategorias,
    cambiarEstadoCategoria
} = require('../controllers/categoria.controller.js');


// Multer
const upload2 = multer(multerConfig);


// Rutas

// OBTENER TODOS LOS USUARIOS
router.get('/categorias', [verifyToken], getCategorias)

// OBTENER TODAS LAS CATEGORIAS ADMIN
router.get('/categorias/admin', [verifyToken, isAdmin], getAllCategorias)

// OBTENER UNA CATEGORIA
router.get('/categorias/:id', [verifyToken], getCategoria)

// CREAR UNA CATEGORIA
router.post('/categorias', [verifyToken, isAdmin, upload2.array('images', 1), cargar_imagen], createCategoria)

// ACTUALIZAR CATEGORIA
router.put('/categorias/:id', [verifyToken, isAdmin, upload2.array('images', 1), cargar_imagen], updateCategoria)



// CAMBIAR ESTADO CATEGORIA
router.put('/categorias/desactivar/:id', [verifyToken, isAdmin], cambiarEstadoCategoria)

// borrar UNA CATEGORIA
// router.delete('/categorias/:id', deleteCategoria)

module.exports = router;
