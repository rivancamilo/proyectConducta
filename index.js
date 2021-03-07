require('dotenv').config();

const express = require('express');
const  { dbConnection } = require('./database/config');
const cors = require('cors')
const app = express();

//configuracion de CORS
app.use(cors())

//lectura y parseo del body
app.use( express.json() );

//base de datos
dbConnection();

//rutas
app.use('/api/usuarios', require('./routes/usuarios.routes'));
app.use('/api/pacientes', require('./routes/paciente.routes'));
app.use('/api/todo', require('./routes/busqueda.routes'));
app.use('/api/upload', require('./routes/uploads.routes'));

app.use('/api/login', require('./routes/auth.routes'));

app.use('/api/entrenamiento', require('./routes/entrenamiento.routes') );



app.listen( process.env.PORT ,() => {
    console.log('servidor corriendo');
})