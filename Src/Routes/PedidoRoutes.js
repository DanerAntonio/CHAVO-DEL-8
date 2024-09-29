const express = require('express');
const router = express.Router();
const pedidoController = require('../Controllers/PedidoController');

// Ruta para crear un nuevo pedido
router.post('/', pedidoController.crearPedido);

// Ruta para obtener todos los pedidos
router.get('/', pedidoController.obtenerPedidos);

// Ruta para obtener un pedido por ID
router.get('/:id', pedidoController.obtenerPedidoPorId);

// Ruta para actualizar un pedido
router.put('/:id', pedidoController.actualizarPedido);

// Ruta para eliminar un pedido
router.delete('/:id', pedidoController.eliminarPedido);

module.exports = router;
