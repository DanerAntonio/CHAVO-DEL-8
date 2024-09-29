const express = require('express');
const router = express.Router();
const devolucionesController = require('../Controllers/DevolucionController'); // Asegúrate de que la ruta sea correcta

// Rutas para las devoluciones
router.post('/', devolucionesController.createDevolucion); // Crear devolución
router.get('/', devolucionesController.getAllDevoluciones); // Obtener todas las devoluciones
router.put('/:id', devolucionesController.updateDevolucion); // Actualizar devolución
router.delete('/:id', devolucionesController.deleteDevolucion); // Eliminar devolución

module.exports = router;
