const express = require('express');
const router = express.Router();
const productoController = require('../Controllers/ProductoController'); // Asegúrate de que esta ruta sea correcta

// Ruta para crear un nuevo producto
router.post('/', productoController.crearProducto);

// Ruta para obtener todos los productos
router.get('/', productoController.obtenerTodosLosProductos);

// Ruta para obtener un producto por ID
router.get('/:id', productoController.obtenerProductoPorId);

// Ruta para actualizar un producto
router.put('/:id', productoController.actualizarProducto);

// Ruta para eliminar un producto
router.delete('/:id', productoController.eliminarProducto);

// Exportar las rutas
module.exports = router;
