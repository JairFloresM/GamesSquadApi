const express = require('express');
const morgan = require('morgan');
// require('dotenv').config();

// Inicializador 
const app = express();

// Configuraciones
app.set('port', 5000);



// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());




// HAY QUE VALIDAR LA CONFIGURACION PARA EL JWT
// VALIDAR TODODS LOS CAMPOS ENTRANTES

// Rutas Api
app.use(require('./routes/usuario.routes.js'));

app.use(require('./routes/categoria.routes.js'));
app.use(require('./routes/region.routes.js'));
app.use(require('./routes/plataforma.routes.js'));

app.use(require('./routes/juego.routes.js'));




// Iniciando el servidor
app.listen(app.get('port'), () => {
    console.log('Se ha iniciado el server en el puerto: ', + app.get('port'));
});