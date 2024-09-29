const express = require('express');
const router = express.Router();
const UsuarioController = require('../Controllers/UsuarioController');

// Rutas para usuarios
router.post('/', UsuarioController.createUser); // Crear usuario
router.get('/', UsuarioController.getUsers); // Obtener usuarios
router.put('/:id', UsuarioController.updateUser); // Actualizar usuario
router.delete('/:id', UsuarioController.deleteUser); // Eliminar usuario

module.exports = router;
