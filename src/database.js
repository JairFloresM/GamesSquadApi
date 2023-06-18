// Firebase
const admin = require('firebase-admin');
const serviceAccount = require('../firebase-permissions.json');


// Configuración de Firebase
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: ''
});


// Referencia a la base de datos
const db = admin.firestore();

module.exports = db;