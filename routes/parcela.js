// Rutas para producto
const express = require('express');
const router = express.Router();
const parcelaController = require('../controllers/parcelaController');

// api/productos
router.post('/', parcelaController.crearParcela);

router.get('/', parcelaController.obtenerParcelas);

router.get('/:id', parcelaController.obtenerParcela);

router.put('/actualizar/:id', parcelaController.actualizarParcela);

router.get('/obs/:id', parcelaController.obtenerParcelaById);
router.get('/par/:id', parcelaController.obtenerParcelaId);

module.exports = router;