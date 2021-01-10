require('dotenv').config();

const express = require('express');
const  { dbConnection } = require('./database/config');
const cors = require('cors')
const app = express();

//configuracion de CORS
app.use(cors())

//base de datos
dbConnection();

app.get('/', (req,res)=>{

})


app.listen( process.env.PORT ,() => {
    console.log('servidor corriendo');
})