const plataformaController = {};

// Base de datos
const db = require('../database');



// OBTENER TODAS LAS REGIONES
plataformaController.getPlataformas = async (req, res) => {

    // Referencia a la colección
    try {
        const plataformaRef = db.collection('plataforma');
        const snapshot = await plataformaRef.get();
        const documentos = snapshot.docs.map(doc => {
            return { id: doc.id, ...doc.data() }
        });
        res.json(documentos);
    } catch (error) {
        console.log('Error al obtener los documentos', error);
        res.status(500).json({ error: 'Error al obtener los documentos' });
    }
}




// OBTENER UNA REGION
plataformaController.getPlataforma = async (req, res) => {

    // Referencia a la colección
    try {
        const plataformaRef = db.collection('plataforma');
        const snapshot = await plataformaRef.doc(req.params.id).get();
        if (snapshot.exists) {
            const data = { id: snapshot.id, ...snapshot.data() };
            res.json(data);
        } else {
            res.status(409).json({ error: 'La Plataforma no existe' });
        }
    } catch (error) {
        console.log('Error al obtener los documentos', error);
        res.status(500).json({ error: 'Error al obtener los documentos' });
    }
}




// OBTENER UNA REGION
plataformaController.createPlataforma = async (req, res) => {
    const newPlataforma = req.body;

    newPlataforma.createdAt = new Date();
    newPlataforma.updatedAt = new Date();

    console.log(newPlataforma)

    // Referencia a la colección
    try {
        await db
            .collection('plataforma')
            .doc()
            .create(newPlataforma);

        res.json({ message: 'Plataforma creada correctamente' });

    } catch (error) {
        console.log('Error al crear el documento', error);
        res.status(500).json({ error: 'Error al crear el documento' });
    }
}



// BORRAR UNA REGION
plataformaController.deletePlataforma = async (req, res) => {

    console.log(req.params.id)

    // Referencia a la colección
    try {
        const plataformaRef = db.collection('plataforma');
        const snapshot = await plataformaRef.doc(req.params.id).get();
        if (snapshot.exists) {
            await db.collection('plataforma').doc(req.params.id).delete();
            res.json({ message: 'Plataforma eliminada correctamente' });
        } else {
            res.status(409).json({ error: 'La plataforma no existe' });
        }
    } catch (error) {
        console.log('Error al obtener los documentos', error);
        res.status(500).json({ error: 'Error al obtener los documentos' });
    }
}



module.exports = plataformaController;
