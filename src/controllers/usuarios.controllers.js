const usuarioController = {};

// Base de datos
const db = require('../database');



usuarioController.getUsuarios = async (req, res) => {

    // Referencia a la colección
    try {
        const usuariosRef = db.collection('usuario');
        const snapshot = await usuariosRef.get();
        const documentos = snapshot.docs.map(doc => doc.data());
        res.json(documentos);
    } catch (error) {
        console.log('Error al obtener los documentos', error);
        res.status(500).json({ error: 'Error al obtener los documentos' });
    }

}

module.exports = usuarioController;