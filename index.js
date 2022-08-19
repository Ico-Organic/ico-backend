const express = require('express');
const conectarDB = require('./config/db');
const cors = require("cors");

// Creamos el servidor
const app = express();

// Conectamos a la BD 
/* 
pass: 0NTKzI9rN2hWVl3M 

mongodb+srv://icoorganic:0NTKzI9rN2hWVl3M@cluster0.czlttyz.mongodb.net/test 

mongodb+srv://icoorganic:0NTKzI9rN2hWVl3M@cluster0.czlttyz.mongodb.net/?retryWrites=true&w=majority 

*/
conectarDB();
app.use(cors())

app.use(express.json());

/**
 * mongodb+srv://icoorganic:0NTKzI9rN2hWVl3M@cluster0.czlttyz.mongodb.net/?retryWrites=true&w=majority 
 * mongodb://localhost:27017/test */
app.use('/productos', require('./routes/producto'));
app.use('/parcela', require('./routes/parcela'));
app.use('/usuarios', require('./routes/usuarios'));
app.use('/servicios', require('./routes/servicios'));

app.listen(4200, () => {
    console.log('El servidor esta corriendo perfectamente')
})
