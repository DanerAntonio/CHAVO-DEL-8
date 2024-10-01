const express = require('express');
const router = express.Router();
const UsuarioController = require('../Controllers/UsuarioController');
const verifyToken = require('../../Middlewares/verifyToken');

// Rutas públicas
router.post('/login', UsuarioController.loginUser);
router.post('/register', UsuarioController.createUser);

// Rutas protegidas con verificación de token
router.get('/users', verifyToken, UsuarioController.getUsers);
router.put('/users/:id', verifyToken, UsuarioController.updateUser);
router.delete('/users/:id', verifyToken, UsuarioController.deleteUser);

module.exports = router;