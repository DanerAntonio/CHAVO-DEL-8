// src/routes/carritoRoutes.js
const express = require('express');
const router = express.Router();
const CarritoController = require('../Controllers/CarritoController');

// Crear un nuevo carrito
router.post('/', CarritoController.crearCarrito);

// Obtener todos los carritos
router.get('/', CarritoController.obtenerCarritos);

// Obtener un carrito por ID
router.get('/:id', CarritoController.obtenerCarritoPorId);

// Actualizar un carrito por ID
router.put('/:id', CarritoController.actualizarCarrito);

// Eliminar un carrito por ID
router.delete('/:id', CarritoController.eliminarCarrito);

module.exports = router;
