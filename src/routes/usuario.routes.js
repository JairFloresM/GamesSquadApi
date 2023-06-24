const { Router } = require('express');
const router = Router();


// Controladores
const {
    getUsuarios,
    getUsuario,
    createUsuario,
    updateUsuario,
    deleteUsuario
} = require('../controllers/usuarios.controllers.js');


// Rutas

// OBTENER TODOS LOS USUARIOS
router.get('/usuarios', getUsuarios)

// OBETENER UN USUARIO
router.get('/usuarios/:id', getUsuario)

// CREAR UN USUARIO
router.post('/usuarios', createUsuario)

// ACTUALIZAR UN USUARIO
router.put('/usuarios', updateUsuario)

// ELIMINAR UN USUARIO
router.delete('/usuarios/:id', deleteUsuario)

module.exports = router;
