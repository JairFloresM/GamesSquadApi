const usuarioController = {};

// Base de datos
const db = require('../database');



// validar que vengan todos los campos sino enviar un error, para todos los empoints



// OBTENER TODOS LOS USUARIOS
usuarioController.getUsuarios = async (req, res) => {

    // Referencia a la colección
    try {
        const usuariosRef = db.collection('usuario');
        const snapshot = await usuariosRef.get();
        const documentos = snapshot.docs.map(doc => {
            return { id: doc.id, ...doc.data() }
        });
        res.json(documentos);
    } catch (error) {
        console.log('Error al obtener los documentos', error);
        res.status(500).json({ error: 'Error al obtener los documentos' });
    }



}



// OBTENER UN USUARIO
usuarioController.getUsuario = async (req, res) => {

    // Referencia a la colección
    try {
        const usuariosRef = db.collection('usuario');
        const snapshot = await usuariosRef.doc(req.params.id).get();
        if (snapshot.exists) {
            const data = { id: snapshot.id, ...snapshot.data() };
            res.json(data);
        } else {
            res.status(409).json({ error: 'El usuario no existe' });
        }
    } catch (error) {
        console.log('Error al obtener los documentos', error);
        res.status(500).json({ error: 'Error al obtener los documentos' });
    }
}



// CREAR UN USUARIO
usuarioController.createUsuario = async (req, res) => {

    const newUser = req.body;

    newUser.correo = newUser.correo.toLowerCase();
    newUser.createdAt = new Date();
    newUser.updatedAt = new Date();


    // Referencia a la colección
    try {
        const usuariosRef = db.collection('usuario');
        const snapshot = await usuariosRef.where('correo', '==', newUser.correo).get();
        const documentos = snapshot.docs.map(doc => doc.data());

        if (documentos.length > 0) {
            res.status(409).json({ error: 'El usuario ya existe' });
        } else {
            await db
                .collection('usuario')
                .doc()
                .create(req.body);

            res.json({ message: 'Usuario creado correctamente' });
        }

    } catch (error) {
        console.log('Error al crear el documento', error);
        res.status(500).json({ error: 'Error al crear el documento' });
    }
}


// ACTUALIZAR UN USUARIO
usuarioController.updateUsuario = async (req, res) => {


    const updateUser = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        // correo: req.body.correo.toLowerCase(),
        // contraseña: req.body.contraseña,
        updatedAt: new Date(),
        edad: req.body.edad,
        avatar: req.body.avatar,
    }



    // Referencia a la colección
    try {
        const usuariosRef = db.collection('usuario');
        const snapshot = await usuariosRef.doc(req.body.id).get();

        if (snapshot.exists) {
            await db
                .collection('usuario')
                .doc(req.body.id)
                .update(updateUser);

            res.json({ message: 'Usuario actualizado correctamente' });
        } else {
            res.status(409).json({ error: 'El usuario no existe' });
        }

    } catch (error) {
        console.log('Error al actualizar el documento', error);
        res.status(500).json({ error: 'Error al actualizar el documento' });
    }
}



// ELIMINAR UN USUARIO
usuarioController.deleteUsuario = async (req, res) => {

    // Referencia a la colección
    try {
        const usuariosRef = db.collection('usuario');
        const snapshot = await usuariosRef.doc(req.params.id).get();

        if (snapshot.exists) {
            await db
                .collection('usuario')
                .doc(req.params.id)
                .delete();

            res.json({ message: 'Usuario eliminado correctamente' });
        } else {
            res.status(409).json({ error: 'El usuario no existe' });
        }

    } catch (error) {
        console.log('Error al eliminar el documento', error);
        res.status(500).json({ error: 'Error al eliminar el documento' });
    }
}


module.exports = usuarioController;