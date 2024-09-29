const express = require('express');
const router = express.Router();
const detalleComprasController = require('../Controllers/DetalleCompraController');

// Crear un nuevo detalle de compra
router.post('/', detalleComprasController.crearDetalleCompra);

// Obtener todos los detalles de compras
router.get('/', detalleComprasController.obtenerDetallesCompras);

// Obtener un detalle de compra por ID
router.get('/:id', detalleComprasController.obtenerDetalleCompraPorId);

// Actualizar un detalle de compra por ID
router.put('/:id', detalleComprasController.actualizarDetalleCompra);

// Eliminar un detalle de compra por ID
router.delete('/:id', detalleComprasController.eliminarDetalleCompra);

module.exports = router;
