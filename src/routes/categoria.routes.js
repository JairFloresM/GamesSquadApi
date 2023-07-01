const { Router } = require('express');
const router = Router();
const { cargar_imagen } = require('../middlewares/cargar_imagen');

const multer = require('multer');
const multerConfig = require('../config/multer.config')


// Controladores
const {
    getCategorias,
    getCategoria,
    createCategoria,
    deleteCategoria,
    updateCategoria
} = require('../controllers/categoria.controller.js');


// Multer
const upload2 = multer(multerConfig);


// Rutas

// OBTENER TODOS LOS USUARIOS
router.get('/categorias', getCategorias)

// OBTENER UNA CATEGORIA
router.get('/categorias/:id', getCategoria)

// CREAR UNA CATEGORIA
router.post('/categorias', [upload2.array('images', 1), cargar_imagen], createCategoria)

// ACTUALIZAR CATEGORIA
router.put('/categorias/:id', [upload2.array('images', 1), cargar_imagen], updateCategoria)


// borrar UNA CATEGORIA
// router.delete('/categorias/:id', deleteCategoria)

module.exports = router;
