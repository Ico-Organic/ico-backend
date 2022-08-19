const mongoose = require('mongoose');

const RecetaSchema = mongoose.Schema({
    productor: { type: mongoose.Types.ObjectId, ref: 'Usuario' },
    ingeniero: { type: mongoose.Types.ObjectId, ref: 'Usuario' },
    parcela: { type: mongoose.Types.ObjectId, ref: 'Parcela' },
    fecha: {type: Date},  
    suelos: {type: Array},
    foliares: {type: Array},
    nov: {type: Number},  
    sup: {type: String},  
});

module.exports = mongoose.model('Receta', RecetaSchema);