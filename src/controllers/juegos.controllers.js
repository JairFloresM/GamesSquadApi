const juegoController = {};

// Base de datos
const db = require('../database');



// OBTENER JUEGO
juegoController.getJuegos = async (req, res) => {

    // Referencia a la colección
    try {
        const usuariosRef = db.collection('juego');
        const snapshot = await usuariosRef.get();
        const documentos = snapshot.docs.map(doc => doc.data());
        res.json(documentos);
    } catch (error) {
        console.log('Error al obtener los documentos', error);
        res.status(500).json({ error: 'Error al obtener los documentos' });
    }
}


// CREAR JUEGO
juegoController.postJuegos = async (req, res) => {

    // Referencia a la colección
    try {
        const usuariosRef = db.collection('juego');
        const snapshot = await usuariosRef.get();
        const documentos = snapshot.docs.map(doc => doc.data());
        res.json(documentos);
    } catch (error) {
        console.log('Error al obtener los documentos', error);
        res.status(500).json({ error: 'Error al obtener los documentos' });
    }
}





module.exports = juegoController;