const detalleCompra = {}

const { db } = require('../database');



detalleCompra.addDetalleCompra = async (req, res) => {
    const { id } = req.params;

    try {
        let llaveUp = null
        let precioTotal = 0

        const carritoRef = db.collection('carrito');
        const carritoSnap = await carritoRef.where('usuario', '==', id).get()
        const carritoJuego = carritoSnap.docs.map(doc => { return { id: doc.id, ...doc.data() } });

        const llaves = carritoJuego.map(async (juego) => {
            const llaveRef = db.collection('llave');
            const llaveSnap = await llaveRef.where('juego', '==', juego.juego).get()
            const llaveData = llaveSnap.docs.map(doc => { return { id: doc.id, ...doc.data() } });
            llaveUp = llaveData.map((el) => el.llaves.filter(llave => llave.estado == 'up'))

            const llavesFinal = []
            llavesRevueltas = llaveUp[0].sort(() => Math.random() - 0.5);

            let i = 0;
            while (i < juego.cantidad) {
                llavesFinal.push(llavesRevueltas[i])
                llavesRevueltas[i].estado = 'down'
                i++
            }

            precioTotal += juego.precio

            // ACTUALIZAR ESTADO DE LLAVES
            db.collection('llave').doc(llaveData[0].id).update({
                llaves: llavesRevueltas
            })

            // ACTUALIZAR ESTADO
            db.collection('carrito').doc(juego.id).update({
                estado: true
            })


            return {
                juego: juego.juego,
                llaves: llavesFinal
            }
        })

        const resolvedDocumentos = await Promise.all(llaves);

        const detalle = {
            usuario: id,
            juegos: resolvedDocumentos,
            precio: precioTotal
        }

        const detalleRef = db.collection('detalle_compra');

        await detalleRef.add(detalle);

        res.json({ mensaje: 'Se agregaron los juegos al detalle', detalle });

    } catch (error) {
        console.log('Error al agregar los juegos al detalle', error);
        res.status(500).json({ error: 'Error al agregar los juegos al detalle' });
    }
}

detalleCompra.getDetalleCompra = async (req, res) => {
    const { id } = req.params;

    // Referencia a la colección
    try {
        const detalleRef = db.collection('detalle_compra');
        const juegoRef = db.collection('juego');

        const detalleSnap = await detalleRef.where('usuario', '==', id).get()
        const detalleData = detalleSnap.docs.map(doc => { return { id: doc.id, ...doc.data() } });

        const juegos = detalleData.map(async (detalle) => {
            const juegos = detalle.juegos.map(async (juego) => {
                console.log(juego.juego);
                const juegoSnap = await juegoRef.doc(juego.juego).get()
                const juegoData = juegoSnap.data();
                return {
                    titulo: juegoData.titulo,
                    imagen: juegoData.images[0],
                    llaves: juego.llaves
                }
            })
            const resolvedDocumentos = await Promise.all(juegos);

            return {
                ...detalle,
                juegos: resolvedDocumentos
            }
        })

        const resolvedJuegos = await Promise.all(juegos);


        res.json(resolvedJuegos);

    } catch (error) {
        console.log('Error al crear el documento', error);
        res.status(500).json({ error: 'Error al crear el documento' });
    }
}




module.exports = detalleCompra;