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

        const filteredData = documentos.filter(item => item.estado === true);

        res.json(filteredData);
    } catch (error) {
        console.log('Error al obtener los documentos', error);
        res.status(500).json({ error: 'Error al obtener los documentos' });
    }
}

// OBTENER TODAS LAS REGIONES
regionController.getAllRegiones = async (req, res) => {

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




regionController.createRegion = async (req, res) => {

    try {
        const newRegion = req.body;

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
    console.log(updateRegion, req.params.id)
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





regionController.cambiarEstadoRegion = async (req, res) => {
    try {
        const id = req.params.id;
        const region = db.collection('region');
        const snapshot = await region.doc(id).get();

        if (!snapshot.exists)
            res.status(409).json({ error: 'La region no existe' });

        const data = snapshot.data().estado == true ? { estado: false } : { estado: true };

        await
            region
                .doc(id)
                .update(data);

        res.json({ message: 'Se cambio el estado de la region' });

    } catch (error) {
        console.log('Error al obtener los documentos', error);
        res.status(500).json({ error: 'Error al obtener la region' });
    }
}


module.exports = regionController;
