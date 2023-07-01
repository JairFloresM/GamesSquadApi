const regionController = {};

// Base de datos
const { db } = require('../database');



// OBTENER TODAS LAS REGIONES
regionController.getRegiones = async (req, res) => {

    // Referencia a la colección
    try {
        const regionRef = db.collection('region');
        const snapshot = await regionRef.get();
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
regionController.getRegion = async (req, res) => {

    // Referencia a la colección
    try {
        const regionRef = db.collection('region');
        const snapshot = await regionRef.doc(req.params.id).get();
        if (snapshot.exists) {
            const data = { id: snapshot.id, ...snapshot.data() };
            res.json(data);
        } else {
            res.status(409).json({ error: 'La Region no existe' });
        }
    } catch (error) {
        console.log('Error al obtener los documentos', error);
        res.status(500).json({ error: 'Error al obtener los documentos' });
    }
}




// OBTENER UNA REGION
regionController.createRegion = async (req, res) => {
    const newRegion = req.body;

    // Referencia a la colección
    try {
        await db
            .collection('region')
            .doc()
            .create(newRegion);

        res.json({ message: 'Region creada correctamente' });

    } catch (error) {
        console.log('Error al crear el documento', error);
        res.status(500).json({ error: 'Error al crear el documento' });
    }
}



regionController.updateRegion = async (req, res) => {


    const updateRegion = req.body;

    const regionRef = db.collection('region');


    // Referencia a la colección
    try {
        const snapshot = await regionRef.doc(req.params.id).get();

        if (!snapshot.exists) {
            res.status(409).json({ error: 'La region no existe' });
        }

        await db
            .collection('region')
            .doc(req.params.id)
            .update(updateRegion);

        res.json({ message: 'Region creada correctamente' });

    } catch (error) {
        console.log('Error al crear el documento', error);
        res.status(500).json({ error: 'Error al crear el documento' });
    }

}


// BORRAR UNA REGION
regionController.deleteRegion = async (req, res) => {

    console.log(req.params.id)

    // Referencia a la colección
    try {
        const regionRef = db.collection('region');
        const snapshot = await regionRef.doc(req.params.id).get();
        if (snapshot.exists) {
            await db.collection('region').doc(req.params.id).delete();
            res.json({ message: 'Region eliminada correctamente' });
        } else {
            res.status(409).json({ error: 'La Region no existe' });
        }
    } catch (error) {
        console.log('Error al obtener los documentos', error);
        res.status(500).json({ error: 'Error al obtener los documentos' });
    }
}



module.exports = regionController;
