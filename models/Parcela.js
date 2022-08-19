const mongoose = require('mongoose');

const ParcelaSchema = mongoose.Schema({
   
    productor: { type: mongoose.Types.ObjectId, ref: 'Usuario' },
    nombre: {
        type: String,
    },
    medidas: {
        type: String,
    },
    rendimiento: {
        type: String,
    },
    cultivo: {
        type: String,
    },
    calle: {
        type: String,
    },
    colonia: {
        type: String,
    },
    cuidad: {
        type: String,
    },
    estado: {
        type: String,
    },
    fecha: {
        type: Date,
        default: Date.now()
    }
   
});

module.exports = mongoose.model('Parcela', ParcelaSchema);