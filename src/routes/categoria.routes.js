const { Router } = require('express');
const router = Router();


// Controladores
const {
    getCategorias,
    getCategoria,
    createCategoria,
    deleteCategoria
} = require('../controllers/categoria.controller.js');


// Rutas

// OBTENER TODOS LOS USUARIOS
router.get('/categorias', getCategorias)

// OBTENER UNA CATEGORIA
router.get('/categorias/:id', getCategoria)

// CREAR UNA CATEGORIA
router.post('/categorias', createCategoria)

// borrar UNA CATEGORIA
router.delete('/categorias/:id', deleteCategoria)

module.exports = router;
