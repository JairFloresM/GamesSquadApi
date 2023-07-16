const xlsx = require('xlsx');
const fs = require('fs');
// const { leerLlavesExcel } = require('../helpers/juego');
const juegoController = {};

// Base de datos
const { db } = require('../database');


// OBTENER TODOS LOS JUEGOS

juegoController.getAllJuegos = async (req, res) => {
    try {
        const usuariosRef = db.collection('juego');
        const snapshot = await usuariosRef.get();

        const documentos = snapshot.docs.map(async (doc) => {
            const categorias = [];
            const categoriaRef = db.collection('categoria');
            const plataformaRef = db.collection('plataforma');
            const regionRef = db.collection('region');
            const data = doc.data();

            for (const element of data.categorias) {
                const data = await categoriaRef.doc(element).get(); // Obtiene la categoria
                categorias.push(data.data().titulo);
            }


            const plataformaSnap = await plataformaRef.doc(data.plataforma).get(); // Obtiene la plataforma
            const plataforma = plataformaSnap.data().titulo;

            const regionSanp = await regionRef.doc(data.region).get(); // Obtiene la region
            const region = regionSanp.data().descripcion;

            return {
                id: doc.id,
                titulo: data.titulo,
                estado: data.estado,
                // fecha_publicacion: data.fecha_publicacion,
                estado: data.estado,
                plataforma: plataforma,
                region: region,
                precio: data.precio,
                image: data.images[0],
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


// OBTENER JUEGOS
juegoController.getJuegos = async (req, res) => {
    try {
        const usuariosRef = db.collection('juego');
        const snapshot = await usuariosRef.where('estado', '==', true).get();

        const documentos = snapshot.docs.map(async (doc) => {
            const categorias = [];
            const categoriaRef = db.collection('categoria');
            const plataformaRef = db.collection('plataforma');
            const regionRef = db.collection('region');
            const data = doc.data();

            for (const element of data.categorias) {
                const data = await categoriaRef.doc(element).get(); // Obtiene la categoria
                categorias.push(data.data().titulo);
            }


            const plataformaSnap = await plataformaRef.doc(data.plataforma).get(); // Obtiene la plataforma
            const plataforma = plataformaSnap.data().titulo;

            const regionSanp = await regionRef.doc(data.region).get(); // Obtiene la region
            const region = regionSanp.data().descripcion;

            return {
                id: doc.id,
                titulo: data.titulo,
                estado: data.estado,
                // fecha_publicacion: data.fecha_publicacion,
                estado: data.estado,
                plataforma: plataforma,
                region: region,
                precio: data.precio,
                image: data.images[0],
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

        if (!snapshot.exists)
            res.status(409).json({ error: 'El juego no existe' });


        const data = snapshot.data();

        if (data.estado == false)
            res.status(409).json({ error: 'El juego no está disponible' });


        const categoriaRef = db.collection('categoria');
        const plataformaRef = db.collection('plataforma');
        const regionRef = db.collection('region');
        const llaveRef = db.collection('llave');


        // for (const element of data.categorias) {
        //     const data = await categoriaRef.doc(element).get(); // Obtiene la categoria
        //     categorias.push(data.data().titulo);
        // }


        // const plataformaSnap = await plataformaRef.doc(data.plataforma).get(); // Obtiene la plataforma
        // const plataforma = plataformaSnap.data().titulo;

        // const regionSanp = await regionRef.doc(data.region).get(); // Obtiene la region
        // const region = regionSanp.data().descripcion;


        const llavesSnap = await llaveRef.where('juego', '==', id).get();
        const llaves = llavesSnap.docs[0].data();

        const cantidadLlaves = llaves.llaves.filter(llave => llave.estado == 'up').length;

        const juego = {
            id: snapshot.id,
            cantidad_disponible: cantidadLlaves,
            titulo: data.titulo,
            estado: data.estado,
            // fecha_publicacion: data.fecha_publicacion,
            estado: data.estado,
            plataforma: data.plataforma,
            region: data.region,
            precio: data.precio,
            image: data.images,
            especificaciones: data.especificaciones,
            descripcion_general: data.descripcion_genereal,
            categorias: data.categorias
        };

        res.json(juego);

    } catch (error) {
        console.log('Error al obtener los documentos', error);
        res.status(500).json({ error: 'Error al obtener el juego' });
    }

}

// CREAR JUEGO
juegoController.postJuegos = async (req, res) => {

    const imagesUrl = req.imageUrl.data
    console.log(req.body.data);
    const newjuego = JSON.parse(req.body.data);
    newjuego.images = imagesUrl


    // Referencia a la colección
    try {
        const usuariosRef = db.collection('juego');
        // const llavesRef = db.collection('llave');

        const juegoCreado = await
            usuariosRef
                .add(newjuego);

        res.json({ message: 'Juego creado correctamente', juego: juegoCreado.id });

    } catch (error) {
        console.log('Error al crear el documento', error);
        res.status(500).json({ error: 'Error al crear el documento' });
    }
}

// CREAR LLAVES DE LOS JUEGOS
juegoController.postJuegosLlaves = async (req, res) => {
    const fileBuffer = req.file.buffer;

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
            columnData.push({
                llave: cell.v,
                estado: 'up'  // up es que no las han usado, down es que ya las usaron
            });
        }

        const llaveRef = db.collection('llave');

        const newLLave = {
            juego: req.body.id,
            llaves: columnData,
        }

        await llaveRef.add(newLLave);

        res.json({ message: 'Llaves creadas correctamente' });

    } catch (error) {
        console.log('Error al leer el archivo de Excel', error);
        res.status(500).json({ error: 'Error al leer el archivo de Excel' });
    }
}


// ACTUALIZAR JUEGO
juegoController.updateJuegos = async (req, res) => {

    const imagesUrl = req.imageUrl.data;
    const updatejuego = JSON.parse(req.body.data);

    const juego = {
        titulo: updatejuego.titulo,
        // fecha_publicacion: updatejuego.fecha_publicacion,
        estado: updatejuego.estado,
        plataforma: updatejuego.plataforma,
        region: updatejuego.region,
        precio: updatejuego.precio,
        images: [...updatejuego.images, ...imagesUrl],
        categorias: updatejuego.categorias,
        descripcion_genereal: updatejuego.descripcion_genereal,
        especificaciones: updatejuego.especificaciones
    }

    // Referencia a la colección
    try {
        const usuariosRef = db.collection('juego');

        const juegoCreado = await
            usuariosRef
                .doc(updatejuego.id)
                .update(juego);

        res.json({ message: 'Juego creado correctamente', juego: juegoCreado.id });

    } catch (error) {
        console.log('Error al crear el documento', error);
        res.status(500).json({ error: 'Error al crear el documento' });
    }
}

// ACTUALIZAR LLAVE DE JUEGOS
juegoController.updateJuegosLlaves = async (req, res) => {

    try {
        const fileBuffer = req.file.buffer;
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
            columnData.push({
                llave: cell.v,
                estado: 'up'  // up es que no las han usado, down es que ya las usaron
            });
        }

        const llaveRef = db.collection('llave');
        const llavesSnap = await llaveRef.where('juego', '==', req.body.id).get();

        const updateLlave = {
            juego: req.body.id,
            llaves: columnData,
        }

        await
            llaveRef
                .doc(llavesSnap.docs[0].id)
                .update(updateLlave);

        res.json({ message: 'Llaves actualizadas correctamente' });

    } catch (error) {
        console.log('Error al leer el archivo de Excel', error);
        res.status(500).json({ error: 'Error al leer el archivo de Excel' });
    }
}

// OBTENER LLAVES DE UN JUEGO
juegoController.getJuegoLlavesAleatoria = async (req, res) => {
    try {
        const id = req.params.id;
        const llaveRef = db.collection('llave');
        const snapshot = await llaveRef.where('juego', '==', id).get();
        const data = snapshot.docs[0].data();

        const llaveUp = data.llaves.filter(llave => llave.estado == 'up');

        if (llaveUp.length == 0)
            res.status(409).json({ error: 'No hay llaves disponibles' });

        const llaveAleatoria = llaveUp[Math.floor(Math.random() * data.llaves.length)];


        res.json({ llaves: llaveAleatoria.llave });

    } catch (error) {
        console.log('Error al obtener los documentos', error);
        res.status(500).json({ error: 'Error al obtener el juego' });
    }
}

juegoController.cambiarEstadoJuego = async (req, res) => {
    try {
        const id = req.params.id;
        const usuariosRef = db.collection('juego');
        const snapshot = await usuariosRef.doc(id).get();

        if (!snapshot.exists)
            res.status(409).json({ error: 'El juego no existe' });

        const data = snapshot.data().estado == true ? { estado: false } : { estado: true };

        await
            usuariosRef
                .doc(id)
                .update(data);

        res.json({ message: 'Se cambio el estado del Juegos' });

    } catch (error) {
        console.log('Error al obtener los documentos', error);
        res.status(500).json({ error: 'Error al obtener el juego' });
    }
}



module.exports = juegoController;