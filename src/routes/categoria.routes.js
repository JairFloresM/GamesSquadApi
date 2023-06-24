const { Router } = require('express');
const router = Router();


// Controladores
const {
    getCategoria,
} = require('../controllers/categoria.controllers.js');



router.get('/usuarios', getCategoria)

module.exports = router;
