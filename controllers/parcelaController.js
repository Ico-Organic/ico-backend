const Parcela = require("../models/Parcela");
var mongoose = require('mongoose');

exports.crearParcela = async (req, res) => {

    try {
        let parcela;

        // Creamos nuestro producto
        parcela = new Parcela(req.body);

        await parcela.save();
        res.send(parcela);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.obtenerParcelas = async (req, res) => {

    try {

        const parcelas = await Parcela.find().sort({fecha: 1})
        res.json(parcelas)
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }

}

exports.actualizarParcela = async (req, res) => {

    try {
        const { calle,nombre, colonia, cuidad, cultivo,estado,medidas,rendimiento } = req.body;
        let parcelas = await Parcela.findById(req.params.id);

        if(!parcelas) {
            res.status(404).json({ msg: 'No existe el producto' })
        }
        parcelas.nombre = nombre;
        parcelas.calle = calle;
        parcelas.colonia = colonia;
        parcelas.cuidad = cuidad;
        parcelas.cultivo = cultivo;
        parcelas.estado = estado;
        parcelas.medidas = medidas;
        parcelas.rendimiento = rendimiento;

        parcelas = await Parcela.findOneAndUpdate({ _id: req.params.id },parcelas, { new: true} )
        res.json(parcelas);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}


exports.obtenerParcela = async (req, res) => {

    try {
        let parcelas = await Parcela.findById(req.params.id);

        if(!parcelas) {
            res.status(404).json({ msg: 'No existe el Parcela1' })
        }
       
        res.json(parcelas);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.obtenerParcelaById = async (req, res) => {
    const id = mongoose.Types.ObjectId(req.params.id) ;
    console.log(id)
    try {
      
      let parcelas = await Parcela.find({productor: id}).populate('productor').sort({fecha: 1})

        if(!parcelas) {
            res.status(404).json({ msg: 'No existe la parcela' })
        }
       
        res.json(parcelas);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}
exports.obtenerParcelaId = async (req, res) => {
    const id =  req.params.id
    console.log(id)
    try {
      let parcelas = await Parcela.findById(id).populate('productor')

        if(!parcelas) {
            res.status(404).json({ msg: 'No existe la parcela' })
        }
       
        res.json(parcelas);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}
