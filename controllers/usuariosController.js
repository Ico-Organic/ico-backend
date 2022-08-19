const Usuario = require("../models/Usuario");
const { encrypt } = require('../helpers/handleBcrypt')
const { httpError } = require('../helpers/handleError')
const { compare } = require('../helpers/handleBcrypt')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = 'secretkey123456';

//TODO: Login!
exports.loginUser = (req, res, next) => {
  const userData = {
    correo: req.body.correo,
    password: req.body.password
  }
  console.log(req.body.password)
  Usuario.findOne({ correo: userData.correo }, (err, user) => {
    if (err) return res.status(500).send('Server error!');

    if (!user) {
      // correo does not exist
      res.status(409).send({ message: 'El correo Está mal' });
    } else {

      bcrypt.compare(userData.password, user.password, (err, data) => {
        //if error than throw error
        if (err) throw err

        //if both match than you can do anything
        if (data) {
          const expiresIn = 24 * 60 * 60;
          const accessToken = jwt.sign({ _id: user.id }, SECRET_KEY, { expiresIn: expiresIn });
          const dataUser = {
            id: user._id,
            nombre: user.nombre + ' ' + user.apellidoPa,
            correo: user.correo,
            telefono: user.telefono,
            rol: user.rol,
            accessToken: accessToken,
            expiresIn: expiresIn
          }
          return res.send({ dataUser });
        } else {
          return res.status(403).send({ message: 'La contraseña está mal' });
        }

      })
    }
  });
}

exports.crearUsuario = async (req, res) => {
  try {
    //TODO: Datos que envias desde el front (postman)
    const { correo, password, nombre, apellidoPa, apellidoMa, rol, telefono, status } = req.body

    const passwordHash = await encrypt(password) //TODO: (123456)<--- Encriptando!!
    const registerUser = await Usuario.create({
      nombre,
      correo,
      apellidoPa,
      apellidoMa,
      rol,
      telefono,
      status,
      password: passwordHash
    })

    res.send({ data: registerUser })

  } catch (e) {
    httpError(res, e)
  }
}


exports.obtenerUsuarios = async (req, res) => {

  try {
    const usuarios = await Usuario.find();

    res.json(usuarios)

  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }

}

exports.actualizarUsuario = async (req, res) => {

  try {
    const { correo, apellidoPa, apellidoMa, rol, telefono, status, nombre } = req.body;

    let usuarios = await Usuario.findById(req.params.id);
   
    if (!usuarios) {
      res.status(404).json({ msg: 'No existe el usuario' })
    }
    usuarios.nombre = nombre;
    usuarios.correo = correo;
    usuarios.apellidoPa = apellidoPa;
    usuarios.apellidoMa = apellidoMa;
    usuarios.rol = rol;
    usuarios.telefono = telefono;
    usuarios.status = status;

    usuarios = await Usuario.findOneAndUpdate({ _id: req.params.id }, usuarios, { new: true })
    res.json(usuarios);
    console.log(usuarios)

  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
}


exports.obtenerUsuario = async (req, res) => {

  try {
    let usuarios = await Usuario.findById(req.params.id);

    if (!usuarios) {
      res.status(404).json({ msg: 'No existe el usuario' })
    }

    res.json(usuarios);

  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
}



exports.ChangePassUser = async (req, res) => {

  try {
    const { password } = req.body;

    let usuarios = await Usuario.findById(req.params.id);
   
    if (!usuarios) {
      res.status(404).json({ msg: 'No existe el usuario' })
    }
    const passwordHash = await encrypt(password) 
    
    usuarios.password = passwordHash;

    usuarios = await Usuario.findOneAndUpdate({ _id: req.params.id }, usuarios, { new: true })
    res.json(usuarios);
    console.log(usuarios)

  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
}

