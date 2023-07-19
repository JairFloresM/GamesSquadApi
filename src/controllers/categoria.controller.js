const categoriaController = {};

// Base de datos
const { db } = require('../database');



// OBTENER TODAS LAS CATEGORIAS
categoriaController.getCategorias = async (req, res) => {
    // Referencia a la colección
    try {
        const categoriaRef = db.collection('categoria');
        const snapshot = await categoriaRef.get();
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


// OBTENER TODAS LAS CATEGORIAS DEL ADMIN
categoriaController.getAllCategorias = async (req, res) => {

    try {
        const categoriaRef = db.collection('categoria');
        const snapshot = await categoriaRef.get();
        const documentos = snapshot.docs.map(doc => {
            return { id: doc.id, ...doc.data() }
        });
        res.json(documentos);
    } catch (error) {
        console.log('Error al obtener los documentos', error);
        res.status(500).json({ error: 'Error al obtener los documentos' });
    }

}



// OBTENER UNA CATEGORIA
categoriaController.getCategoria = async (req, res) => {

    // Referencia a la colección
    try {
        const categoriaRef = db.collection('categoria');
        const snapshot = await categoriaRef.doc(req.params.id).get();
        if (snapshot.exists) {
            const data = { id: snapshot.id, ...snapshot.data() };
            res.json(data);
        } else {
            res.status(409).json({ error: 'La categoria no existe' });
        }
    } catch (error) {
        console.log('Error al obtener los documentos', error);
        res.status(500).json({ error: 'Error al obtener los documentos' });
    }
}




// OBTENER UNA CATEGORIA
categoriaController.createCategoria = async (req, res) => {

    const imagesUrl = req.imageUrl.data;
    const newCategoria = JSON.parse(req.body.data);
    newCategoria.images = imagesUrl

    console.log(newCategoria)

    // Referencia a la colección
    try {
        await db
            .collection('categoria')
            .doc()
            .create(newCategoria);

        res.json({ message: 'Categoria creada correctamente' });

    } catch (error) {
        console.log('Error al crear el documento', error);
        res.status(500).json({ error: 'Error al crear el documento' });
    }
}


categoriaController.updateCategoria = async (req, res) => {

    const imagesUrl = req.imageUrl.data;
    const categoria = JSON.parse(req.body.data);

    const imageFinal = categoria.images ? categoria.images : imagesUrl;
    console.log(categoria.images)
    console.log(imagesUrl)
    console.log(imageFinal)

    const updateCategoria = {
        titulo: categoria.titulo,
        descripcion: categoria.descripcion,
        images: imageFinal,
        estado: categoria.estado,
    }

    const categoriaRef = db.collection('categoria');

    // Referencia a la colección
    try {
        console.log(req.params.id)
        const snapshot = await categoriaRef.doc(req.params.id).get();

        if (!snapshot.exists) {
            res.status(409).json({ error: 'La categoria no existe' });
        }

        await categoriaRef
            .doc(req.params.id)
            .update(updateCategoria);

        res.json({ message: 'Categoria actualizada correctamente' });

    } catch (error) {
        console.log('Error al crear el documento', error);
        res.status(500).json({ error: 'Error al crear el documento' });
    }
}



categoriaController.cambiarEstadoCategoria = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id)
        const categoria = db.collection('categoria');
        const snapshot = await categoria.doc(id).get();

        if (!snapshot.exists)
            res.status(409).json({ error: 'La categoria no existe' });

        const data = snapshot.data().estado == true ? { estado: false } : { estado: true };

        await
            categoria
                .doc(id)
                .update(data);

        res.json({ message: 'Se cambio el estado de la categoria' });

    } catch (error) {
        console.log('Error al obtener los documentos', error);
        res.status(500).json({ error: 'Error al obtener la categoria' });
    }
}


// BORRAR UNA CATEGORIA
categoriaController.deleteCategoria = async (req, res) => {

    console.log(req.params.id)

    // Referencia a la colección
    try {
        const categoriaRef = db.collection('categoria');
        const snapshot = await categoriaRef.doc(req.params.id).get();
        if (snapshot.exists) {
            await db.collection('categoria').doc(req.params.id).delete();
            res.json({ message: 'Categoria eliminada correctamente' });
        } else {
            res.status(409).json({ error: 'La categoria no existe' });
        }
    } catch (error) {
        console.log('Error al obtener los documentos', error);
        res.status(500).json({ error: 'Error al obtener los documentos' });
    }
}



module.exports = categoriaController;
