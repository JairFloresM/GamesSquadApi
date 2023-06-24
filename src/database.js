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



// Configuracion con supabase

// const { createClient } = require('@supabase/supabase-js');


// const supabaseUrl = process.env.SUPABASE_URL;
// const supabaseKey = process.env.SUPABASE_ANON_KEY;


// const supabase = createClient(supabaseUrl, supabaseKey);


module.exports = db;