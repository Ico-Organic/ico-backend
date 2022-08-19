const mongoose = require('mongoose');

const AgendaSchema = mongoose.Schema({
   
    solicitorBy: { type: mongoose.Types.ObjectId, ref: 'Usuario' },
    solicitorTo: { type: mongoose.Types.ObjectId, ref: 'Usuario' },
    parcela: { type: mongoose.Types.ObjectId, ref: 'Parcela' },
    receta: { type: mongoose.Types.ObjectId, ref: 'Receta' },
    aIni: {
        type: String,
    },
    fechaIni: {
        type: String,
    },
    fechaFin: {
        type: String,
    },
    horaIni: {
        type: String,
    },
    horaFin: {
        type: String,
    },
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    tipo: {
        type: String,
    },
    status: {
        type: String,
    }
   
});

module.exports = mongoose.model('Agenda', AgendaSchema);