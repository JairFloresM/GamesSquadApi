const { Router } = require('express');
const router = Router();


// Controladores
const {
    getJuegos,
    postJuegos
} = require('../controllers/juegos.controllers.js');



router.get('/juegos', getJuegos)
router.post('/juegos', postJuegos)

module.exports = router;
