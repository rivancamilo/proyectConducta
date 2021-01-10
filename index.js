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


app.listen( process.env.PORT ,() => {
    console.log('servidor corriendo');
})