const mongoose = require('mongoose');

const UsuarioSchema = mongoose.Schema({
    nombre: {
        type: String,
    },
    apellidoPa: {
        type: String,
    },    
    apellidoMa: {
        type: String,
    },
    rol: {
        type: String,
    },
    correo: {
        type: String,
    },
    password: {
        type: String,
    },
    telefono: {
        type: String,
    },
    status: {
        type: String,
    },
    fecha: {
        type: Date,
        default: Date.now()
    }
   
});

module.exports = mongoose.model('Usuario', UsuarioSchema);