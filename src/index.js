const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

// const supabase = require('./supabase.js');
require('dotenv').config();

// Inicializador 
const app = express();

// Configuraciones
app.set('port', 5000);
app.use(cors());


// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());




// HAY QUE VALIDAR LA CONFIGURACION PARA EL JWT
// VALIDAR TODODS LOS CAMPOS ENTRANTES

// Rutas Api
app.use(require('./routes/usuario.routes.js'));
app.use(require('./routes/categoria.routes.js'));
app.use(require('./routes/region.routes.js'));
app.use(require('./routes/plataforma.routes.js'));
app.use(require('./routes/juego.routes.js'));
app.use(require('./routes/carrito.routes.js'));
app.use(require('./routes/detalle_compra.routes.js'));
app.use(require('./routes/generales.routes.js'));



// PUBLIC
app.use(express.static(path.join(__dirname, 'public')))



// Iniciando el servidor
app.listen(app.get('port'), () => {
    console.log('Se ha iniciado el server en el puerto: ', + app.get('port'));
});
