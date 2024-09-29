const express = require('express');
const {
    crearDetalleVenta,
    obtenerDetallesVentas,
    anularDetalleVenta,
    actualizarDetalleVenta
} = require('../Controllers/DetalleVentaController');

const router = express.Router();

router.post('/', crearDetalleVenta); // Crear un nuevo detalle de venta
router.get('/', obtenerDetallesVentas); // Obtener todos los detalles de ventas
router.put('/:id', actualizarDetalleVenta); // Actualizar un detalle de venta
router.patch('/anular/:id', anularDetalleVenta); // Anular un detalle de venta usando PATCH

module.exports = router;
