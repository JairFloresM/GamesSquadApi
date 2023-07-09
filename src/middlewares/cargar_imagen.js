const fs = require('fs');
const { db, storage } = require('../database');


const cargar_imagen = {};


cargar_imagen.cargar_imagen = async (req, res, next) => {
    try {
        const uploadedImages = req.files;
        const imageUrl = [];
        const carpeta = req.body.carpeta;

        for (let i = 0; i < uploadedImages.length; i++) {
            const image = uploadedImages[i];

            let bucket = storage.bucket();
            let storagePath = `${carpeta}/${image.filename}`;
            await bucket.upload(image.path, {
                destination: storagePath
            });

            setTimeout(() => {
                fs.unlinkSync(image.path);
            }, 1000); // Espera 5 segundos antes de eliminar la imagen

            // const downloadURL = `https://storage.googleapis.com/${bucket.name}/${storagePath}`;
            const downloadURL = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${carpeta}%2F${image.filename}?alt=media`;


            imageUrl.push(downloadURL);
        }

        req.imageUrl = { data: imageUrl };

        next();

    } catch (error) {
        console.log('Error al procesar las imágenes', error);
        res.status(500).json({ error: 'Error al procesar las imágenes' });
    }
}



module.exports = cargar_imagen;



