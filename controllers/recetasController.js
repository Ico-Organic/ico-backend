

const Receta = require("../models/Receta");
var mongoose = require('mongoose');


exports.crearReceta = async (req, res) => {
    try {
        //TODO: Datos que envias desde el front (postman)
        const { productor, ingeniero, parcela, suelos,  foliares,fecha,nov,sup} = req.body
        const registerRec = await Receta.create({
            productor,
            ingeniero,
            parcela,
            suelos,
            foliares,
            fecha,
            nov,
            sup
        })
        res.send({ resp: registerRec })

    } catch (e) {
        httpError(res, e)
    }
}
exports.obtenerRecetas = async (req, res) => {

    try {
        const recetas = await Receta.find();
        res.json(recetas)
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }

}
exports.obtenerRecetasByIdParcela = async (req, res) => {
    const id = mongoose.Types.ObjectId(req.params.id) ;
    try {
      
      let recetas = await Receta.find({parcela: id}).populate('parcela').sort({fecha: -1})

        if(!recetas) {
            res.status(404).json({ msg: 'No existe la parcela' })
        }
       
        res.json(recetas);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}
exports.obtenerRecetasByIdProductor= async (req, res) => {
    const id = mongoose.Types.ObjectId(req.params.id) ;
    try {
      
      let recetas = await Receta.find({productor: id}).populate('parcela').populate('ingeniero').populate('productor')

        if(!recetas) {
            res.status(404).json({ msg: 'No existe recetas de ' })
        }
       
        res.json(recetas);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}