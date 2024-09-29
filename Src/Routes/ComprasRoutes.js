const express = require('express');
const router = express.Router();
const ComprasController = require('../Controllers/ComprasController'); // Asegúrate de que la ruta sea correcta

// Rutas para las compras
router.post('/', ComprasController.createCompra); // Crear compra
router.get('/', ComprasController.obtenerCompras); // Obtener todas las compras
router.get('/:id', ComprasController.getCompraById); // Obtener compra por ID
router.put('/:id', ComprasController.updateCompra); // Actualizar compra
router.delete('/:id', ComprasController.deleteCompra); // Eliminar compra

module.exports = router;
