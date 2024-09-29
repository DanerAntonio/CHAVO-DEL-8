const express = require('express');
const router = express.Router();
const CategoriaProductoController = require('../Controllers/CategoriaProductoController'); 

// Obtener todas las categorías de producto
router.get('/', CategoriaProductoController.obtenerCategoriasProducto); 

// Crear una nueva categoría de producto
router.post('/', CategoriaProductoController.createCategoria);

// Obtener una categoría por id
router.get('/:id', CategoriaProductoController.getCategoriaById);

// Actualizar una categoría
router.put('/:id', CategoriaProductoController.updateCategoria);

// Eliminar una categoría
router.delete('/:id', CategoriaProductoController.deleteCategoria);

module.exports = router;
