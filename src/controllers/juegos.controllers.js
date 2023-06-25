const xlsx = require('xlsx');


const juegoController = {};

// Base de datos
const db = require('../database');



// OBTENER JUEGO
juegoController.getJuegos = async (req, res) => {
    try {
        const usuariosRef = db.collection('juego');
        const snapshot = await usuariosRef.get();

        const documentos = snapshot.docs.map(async (doc) => {
            const categorias = [];
            const categoriaRef = db.collection('categoria');
            const plataformaRef = db.collection('plataforma');
            const regionRef = db.collection('region');
            const imageRef = db.collection('image');


            for (const element of doc.data().categorias) {
                const data = await categoriaRef.doc(element).get(); // Obtiene la categoria
                categorias.push(data.data().titulo);
            }

            const plataformaSnap = await plataformaRef.doc(doc.data().plataforma).get(); // Obtiene la plataforma
            const plataforma = plataformaSnap.data().descripcion;

            const regionSanp = await regionRef.doc(doc.data().region).get(); // Obtiene la region
            const region = regionSanp.data().descripcion;

            const imageSnap = await imageRef.where('juego', '==', doc.id).where('isFirst', '==', true).get(); // Obtiene la region

            const image = imageSnap._docs()[0]._fieldsProto.image.stringValue;  // no se porque tuve que hacer esto, pero no me funcionaba de la otra manera

            return {
                id: doc.id,
                titulo: doc.data().titulo,
                estado: doc.data().estado,
                fecha_publicacion: doc.data().fecha_publicacion,
                estado: doc.data().estado,
                plataforma: plataforma,
                region: region,
                precio: doc.data().precio,
                image: image,   // se comenta porque es muy largo el string
                categorias
            };
        });

        // Esperar a que se resuelvan todas las promesas dentro del array
        const resolvedDocumentos = await Promise.all(documentos);

        res.json(resolvedDocumentos);

    } catch (error) {
        console.log('Error al obtener los documentos', error);
        res.status(500).json({ error: 'Error al obtener los documentos' });
    }
}


// OBTENER UN JUEGO
juegoController.getJuego = async (req, res) => {
    try {
        const id = req.params.id;
        const usuariosRef = db.collection('juego');
        const snapshot = await usuariosRef.doc(id).get();
        const categorias = [];

        if (snapshot.exists) {

            const categoriaRef = db.collection('categoria');
            const plataformaRef = db.collection('plataforma');
            const regionRef = db.collection('region');
            const imageRef = db.collection('image');
            const descripcionRef = db.collection('descripcion_juego');



            for (const element of snapshot.data().categorias) {
                const data = await categoriaRef.doc(element).get(); // Obtiene la categoria
                categorias.push(data.data().titulo);
            }

            const plataformaSnap = await plataformaRef.doc(snapshot.data().plataforma).get(); // Obtiene la plataforma
            const plataforma = plataformaSnap.data().descripcion;

            const regionSanp = await regionRef.doc(snapshot.data().region).get(); // Obtiene la region
            const region = regionSanp.data().descripcion;

            const imageSnap = await imageRef.where('juego', '==', snapshot.id).get();
            const images = imageSnap._docs().map(el => el._fieldsProto.image.stringValue);  // no se porque tuve que hacer esto, pero no me funcionaba de la otra manera



            const descripcionSnap = await descripcionRef.where('juego', '==', snapshot.id).get(); // Obtiene la region
            const descripcion = descripcionSnap._docs().map(el => {
                return { descripcion: el._fieldsProto.descripcion_genereal.stringValue, especificaciones: el._fieldsProto.especificaciones.stringValue }
            });


            const juego = {
                id: snapshot.id,
                titulo: snapshot.data().titulo,
                estado: snapshot.data().estado,
                fecha_publicacion: snapshot.data().fecha_publicacion,
                estado: snapshot.data().estado,
                plataforma: plataforma,
                region: region,
                precio: snapshot.data().precio,
                images: images,   // se comenta porque es muy largo el string
                categorias,
                descripciones: descripcion
            };

            res.json(juego);
        } else {
            res.status(409).json({ error: 'El usuario no existe' });
        }
    } catch (error) {
        console.log('Error al obtener los documentos', error);
        res.status(500).json({ error: 'Error al obtener el juego' });
    }

}

// CREAR JUEGO
juegoController.postJuegos = async (req, res) => {

    const newjuego = req.body;

    newjuego.createdAt = new Date();
    newjuego.updatedAt = new Date();

    // Referencia a la colección
    try {
        const usuariosRef = db.collection('juego');

        const juegoCreado = await
            usuariosRef
                .add(req.body);

        res.json({ message: 'Juego creado correctamente', id: juegoCreado.id });

    } catch (error) {
        console.log('Error al crear el documento', error);
        res.status(500).json({ error: 'Error al crear el documento' });
    }
}

// LLAVE DE LOS JUEGOS
juegoController.postJuegosLlaves = async (req, res) => {
    const fileBuffer = req.file.buffer;
    // console.log(req.body.id);

    try {
        const workbook = xlsx.read(fileBuffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const columnData = [];

        // Iterar sobre las celdas de la primera columna
        for (let i = 1; ; i++) {
            const cellAddress = 'A' + i;
            const cell = worksheet[cellAddress];

            if (!cell || !cell.v) {
                // Si no hay más celdas o la celda está vacía, finalizar el bucle
                break;
            }
            columnData.push(cell.v);
        }

        const llaveRef = db.collection('llave');

        const newLLave = {
            juego: req.body.id,
            llaves: columnData,
            createdAt: new Date(),
            updatedAt: new Date()
        }

        await llaveRef.add(newLLave);

        res.json({ message: 'Llaves creadas correctamente' });

    } catch (error) {
        console.log('Error al leer el archivo de Excel', error);
        res.status(500).json({ error: 'Error al leer el archivo de Excel' });
    }
}

// LLAVE DE Las IMAGENES
juegoController.postJuegosImagenes = async (req, res) => {
    try {
        const uploadedImages = req.files;
        const llaveRef = db.collection('image');

        uploadedImages.forEach(async (image, index) => {
            // console.log(image);
            await llaveRef.add(
                {
                    juego: req.body.id,
                    isFirst: index === 0,    // Si es la primera imagen
                    image: image.buffer.toString('base64'),
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            );
        });

        res.json({ message: 'Imagenes creadas correctamente' });
    } catch (error) {
        console.log('Error al procesar las imágenes', error);
        res.status(500).json({ error: 'Error al procesar las imágenes' });
    }
}

// CREAR DESCRIPCION DE JUEGO
juegoController.postJuegosDescripcion = async (req, res) => {

    try {
        req.body.createdAt = new Date();
        req.body.updatedAt = new Date();
        const descripcionRef = db.collection('descripcion_juego');

        await descripcionRef.add(
            req.body
        );

        res.json({ message: 'Descripciones creadas correctamente' });
    } catch (error) {
        console.log('Error al procesar las descripciones', error);
        res.status(500).json({ error: 'Error al procesar las descripciones' });
    }
}


// ACTUALIZAR JUEGO
juegoController.updateJuegos = async (req, res) => {

}

// ACTUALIZAR LLAVE DE JUEGOS
juegoController.updateJuegosLlaves = async (req, res) => {

}

// ACTUALIZAR IMAGENES DE JUEGO
juegoController.updateJuegosImagenes = async (req, res) => {

}

// ACTUALIZAR DESCRIPCION DE JUEGO
juegoController.updateJuegosDescripcion = async (req, res) => {

}
module.exports = juegoController;