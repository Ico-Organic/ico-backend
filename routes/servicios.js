// Rutas para producto
const express = require('express');
const router = express.Router();
const RecetaController = require('../controllers/recetasController');
const AgendaController = require('../controllers/agendaController');

// api/productos
router.post('/', RecetaController.crearReceta);
router.get('/', RecetaController.obtenerRecetas);
router.get('/parcela/:id', RecetaController.obtenerRecetasByIdParcela);
router.get('/productor/:id', RecetaController.obtenerRecetasByIdProductor);

router.post('/agenda/', AgendaController.crearCita);
router.get('/citas/', AgendaController.obtenerCitas);
router.get('/mis-cita/:id', AgendaController.obtenerCitaToId);
router.get('/mis-citas/:id', AgendaController.obtenerCitaToIdPen);
router.get('/mis-citas-by/:id', AgendaController.obtenerCitaByIdPen);

router.put('/actualizar-status/:id', AgendaController.actualizarStatus);
router.put('/actualizar-receta/:id', AgendaController.actualizarReceta);


module.exports = router;