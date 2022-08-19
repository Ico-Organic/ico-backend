// Rutas para producto
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuariosController');
// api/productos
router.post('/', usuarioController.crearUsuario);
router.get('/', usuarioController.obtenerUsuarios);
router.get('/:id', usuarioController.obtenerUsuario);
router.put('/actualizar/:id', usuarioController.actualizarUsuario);
router.put('/passwords/:id', usuarioController.ChangePassUser);
router.post('/login', usuarioController.loginUser);


module.exports = router;