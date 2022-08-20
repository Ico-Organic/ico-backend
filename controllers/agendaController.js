const Agenda = require("../models/Agenda");
var mongoose = require('mongoose');

exports.crearCita = async (req, res) => {

    try {
        let agenda;
        agenda = new Agenda(req.body);

        await agenda.save();
        res.send(agenda);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}
exports.obtenerCitaToId = async (req, res) => {
    const id = mongoose.Types.ObjectId(req.params.id) ;
    console.log(id)
    try {
      
      let agendas = await Agenda.find({solicitorTo: id, status: 'APROBADA'} ).populate('solicitorBy').populate('solicitorTo')

        if(!agendas) {
            res.status(404).json({ msg: 'No existe al cita' })
        }
       
        res.json(agendas);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.obtenerCitaToIdPen = async (req, res) => {
    const id = mongoose.Types.ObjectId(req.params.id) ;
    console.log(id)
    try {
      
      let agendas = await Agenda.find({solicitorTo: id} ).populate('solicitorBy').populate('receta').populate('parcela').sort({fechaIni: 1})

        if(!agendas) {
            res.status(404).json({ msg: 'No existe al cita' })
        }
       
        res.json(agendas);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}
exports.obtenerCitaByIdPen = async (req, res) => {
    const id = mongoose.Types.ObjectId(req.params.id) ;
    console.log(id)
    try {
      
      let agendas = await Agenda.find({solicitorBy: id} ).populate('solicitorTo').populate('receta').populate('parcela').sort({fechaIni: -1})
 
        if(!agendas) {
            res.status(404).json({ msg: 'No existe al cita' })
        }
       
        res.json(agendas);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}
exports.obtenerCitas = async (req, res) => {

    try {

        const agendas = await Agenda.find().populate('solicitorBy').populate('solicitorTo').sort({fechaIni: -1})
        res.json(agendas)
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }

}
exports.actualizarStatus= async (req, res) => {

    try {
        const { status } = req.body;
        console.log(status)
        let agendas = await Agenda.findById(req.params.id).populate('receta').populate('parcela');

        if(!agendas) {
            res.status(404).json({ msg: 'No existe el producto' })
        }
       
        agendas.status = status;

        agendas = await Agenda.findOneAndUpdate({ _id: req.params.id },agendas, { new: true} )
        res.json(agendas);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}


exports.actualizarReceta = async (req, res) => {

    try {
        const { receta } = req.body;
        const idreceta = mongoose.Types.ObjectId(receta) 

        let agendas = await Agenda.findById(req.params.id).populate('receta').populate('parcela');
        console.log(req.params.id)
        console.log(agendas)
        if (!agendas) {
            res.status(404).json({ msg: 'No existe el usuario' })
        }
        agendas.receta = idreceta;
       

        agendas = await Agenda.findOneAndUpdate({ _id: req.params.id }, agendas, { new: true })
        res.json(agendas);
        console.log(agendas)

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}
