// Firebase
const admin = require('firebase-admin');
const { getStorage } = require('firebase-admin/storage')

const serviceAccount = require('../firebase-permissions.json');


// Configuración de Firebase
 admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'gs://gamesquad-4424b.appspot.com/',
    databaseURL: ''
});


// Referencia a la base de datos
const firebase = {};

firebase.db = admin.firestore();
firebase.storage = admin.storage();




module.exports = firebase;