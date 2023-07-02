const generalController = {};


const { db } = require('../database');
const index = require('../config/angolia.config.js');


generalController.buscadorJuegos = async (req, res) => {
    try {
        const param1 = req.params.juego

        const response = await index.search(param1, {
            restrictSearchableAttributes: ['titulo'], // solo se buscara en el atributo titulo
            facetFilters: ['estado:true'], // solo se devolveran los juegos que esten activos
            hitsPerPage: 10   // se devolveran 10 registros por busqueda
        });


        const juegosBusqueda = response.hits.map(async (juego) => {
            const idJuego = juego.objectID

            const juegoRef = db.collection('juego');
            const snapshot = await juegoRef.doc(idJuego).get();

            const categoriaRef = db.collection('categoria');
            const plataformaRef = db.collection('plataforma');
            const regionRef = db.collection('region');
            const data = snapshot.data();
            const categorias = [];


            for (const element of data.categorias) {
                const data = await categoriaRef.doc(element).get(); // Obtiene la categoria
                categorias.push(data.data().titulo);
            }


            const plataformaSnap = await plataformaRef.doc(data.plataforma).get(); // Obtiene la plataforma
            const plataforma = plataformaSnap.data().titulo;

            const regionSanp = await regionRef.doc(data.region).get(); // Obtiene la region
            const region = regionSanp.data().descripcion;


            return {
                id: idJuego,
                titulo: data.titulo,
                estado: data.estado,
                fecha_publicacion: data.fecha_publicacion,
                estado: data.estado,
                plataforma: plataforma,
                region: region,
                precio: data.precio,
                image: data.images[0],
                especificaciones: data.especificaciones,
                descripcion_general: data.descripcion_genereal,
                categorias
            };
        });

        const resolvedDocumentos = await Promise.all(juegosBusqueda);

        res.json(resolvedDocumentos);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el juego' });

    }
}


generalController.buscadorJuegosCategoria = async (req, res) => {
    try {
        const param1 = req.params.categoria


        const response = await index.search(param1, {
            restrictSearchableAttributes: ['categorias'], // solo se buscara en el atributo titulo
            facetFilters: ['estado:true'], // solo se devolveran los juegos que esten activos
            hitsPerPage: 10   // se devolveran 10 registros por busqueda
        });


        const juegosBusqueda = response.hits.map(async (juego) => {
            const idJuego = juego.objectID

            const juegoRef = db.collection('juego');
            const snapshot = await juegoRef.doc(idJuego).get();

            const categoriaRef = db.collection('categoria');
            const plataformaRef = db.collection('plataforma');
            const regionRef = db.collection('region');
            const data = snapshot.data();
            const categorias = [];


            for (const element of data.categorias) {
                const data = await categoriaRef.doc(element).get(); // Obtiene la categoria
                categorias.push(data.data().titulo);
            }


            const plataformaSnap = await plataformaRef.doc(data.plataforma).get(); // Obtiene la plataforma
            const plataforma = plataformaSnap.data().titulo;

            const regionSanp = await regionRef.doc(data.region).get(); // Obtiene la region
            const region = regionSanp.data().descripcion;


            return {
                id: idJuego,
                titulo: data.titulo,
                estado: data.estado,
                fecha_publicacion: data.fecha_publicacion,
                estado: data.estado,
                plataforma: plataforma,
                region: region,
                precio: data.precio,
                image: data.images[0],
                especificaciones: data.especificaciones,
                descripcion_general: data.descripcion_genereal,
                categorias
            };
        });

        const resolvedDocumentos = await Promise.all(juegosBusqueda);

        res.json(resolvedDocumentos);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los juego' });

    }
}

generalController.juegosMasVendidos = async (req, res) => {
    try {
        const querySnapshot = await db.collection('carrito')
            .where('estado', '==', true)
            .get();

        const ventasPorJuego = {};

        querySnapshot.forEach(doc => {
            const juegoId = doc.data().juego;
            const cantidad = doc.data().cantidad;

            if (ventasPorJuego[juegoId]) {
                ventasPorJuego[juegoId] += cantidad;
            } else {
                ventasPorJuego[juegoId] = cantidad;
            }
        });

        const ventasOrdenadas = Object.entries(ventasPorJuego).sort((a, b) => b[1] - a[1]);

        const juegosMasVendidos = ventasOrdenadas.map(async (juego) => {
            const idJuego = juego[0];

            const juegoRef = db.collection('juego');
            const snapshot = await juegoRef.doc(idJuego).get();

            const categoriaRef = db.collection('categoria');
            const data = snapshot.data();
            const categorias = [];


            for (const element of data.categorias) {
                const data = await categoriaRef.doc(element).get(); // Obtiene la categoria
                categorias.push(data.data().titulo);
            }

            return {
                id: idJuego,
                copias_vendidas: juego[1],
                titulo: data.titulo,
                image: data.images[0],
                categorias: categorias.slice(0, 2)
            };
        });

        const resolvedDocumentos = await Promise.all(juegosMasVendidos);


        res.json(resolvedDocumentos);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los juego' });
    }
}



module.exports = generalController;