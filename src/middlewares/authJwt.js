const jwt = require('jsonwebtoken')
const { db } = require('../database');


verifyToken = async (req, res, next) => {
    try {
        const token = req.headers['x-access-token'];
        console.log(token);
        if (!token)
            return res.status(403).json({ message: 'No existe el token' });

        const decode = jwt.verify(token, process.env.JWT);
        req.userId = decode.id;

        // // validacion del vencimiento del token
        // const decodedToken = JSON.parse(atob(token.split('.')[1]));
        // const expirationDate = new Date(decodedToken.exp * 1000); // La fecha de expiración se mide en segundos, así que se multiplica por 1000 para convertirla a milisegundos.
        // const currentDate = new Date();

        const usuariosRef = db.collection('usuario');
        const snapshot = await usuariosRef.doc(req.userId).get();

        if (!snapshot.exists)
            return res.status(404).json({ message: 'No se encontro el usuario' })

        next();
    } catch (error) {
        return res.status(401).json({ message: 'No Autorizado' })
    }
}


isAdmin = async (req, res, next) => {
    // try {

    //     const usuariosRef = db.collection('usuario');
    //     const snapshot = await usuariosRef.doc(req.userId).get();

    //     if (!snapshot.exists)
    //         return res.status(404).json({ message: 'No se encontro el usuario' })

    //     const user = snapshot.data();

    //     const role = user.tipo_usuario;

    //     if (role != 'admin')
    //         return res.status(403).json({ message: 'Sin rol de Administrador' })


    //     next();
    // } catch (error) {
    //     console.log(error);
    //     return res.status(401).json({ message: 'No Autorizado' })
    // }
    console.log(6);
    next();
}



module.exports = {
    verifyToken,
    isAdmin
}