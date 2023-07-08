const jwt = require('jsonwebtoken')
const { db } = require('../database');


verifyToken = async (req, res, next) => {
    // try {
    //     const token = req.headers['x-access-token'];

    //     if (!token)
    //         return res.status(403).json({ message: 'No exite el token' });

    //     const decode = jwt.verify(token, process.env.JWT);
    //     req.userId = decode.id;

    //     console.log(req.userId);


    //     const usuariosRef = db.collection('usuario');
    //     const snapshot = await usuariosRef.doc(req.userId).get();

    //     if (!snapshot.exists)
    //         return res.status(404).json({ message: 'No se encontro el usuario' })

    //     next();
    // } catch (error) {
    //     return res.status(401).json({ message: 'No Autorizado' })
    // }

    next();


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

    next();
}



module.exports = {
    verifyToken,
    isAdmin
}