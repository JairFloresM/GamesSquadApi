const { Router } = require('express');
const router = Router();


// Controladores
const {
    getUsuarios,
} = require('../controllers/usuarios.controllers.js');



router.get('/usuarios', getUsuarios)

module.exports = router;
