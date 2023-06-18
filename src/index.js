const express = require('express');
const morgan = require('morgan');


// Inicializador 
const app = express();

// Configuraciones
app.set('port', 5000);



// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());




// Rutas Api
app.use(require('./routes/usuario.routes.js'));




// Iniciando el servidor
app.listen(app.get('port'), () => {
    console.log('Se ha iniciado el server en el puerto: ', + app.get('port'));
});