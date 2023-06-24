const { Router } = require('express');
const router = Router();


// Controladores
const {
    getPlataformas,
    getPlataforma,
    createPlataforma,
    deletePlataforma
} = require('../controllers/plataforma.controller.js');


// Rutas

// OBTENER TODOS LAS PLATAFIORMAS
router.get('/plataforma', getPlataformas)

// OBTENER UNA PLATAFORMA
router.get('/plataforma/:id', getPlataforma)

// CREAR UNA PLATAFORMA
router.post('/plataforma', createPlataforma)

// borrar UNA PLATAFORMA
router.delete('/plataforma/:id', deletePlataforma)

module.exports = router;
