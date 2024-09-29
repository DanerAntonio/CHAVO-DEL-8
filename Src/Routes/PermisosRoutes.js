const express = require('express');
const { crearPermiso, obtenerPermisos, actualizarPermiso, eliminarPermiso } = require('../Controllers/PermisosController');

const router = express.Router();

// Rutas de permisos
router.post('/', crearPermiso); // Crear permiso
router.get('/', obtenerPermisos); // Obtener todos los permisos
router.put('/:id', actualizarPermiso); // Actualizar permiso por ID
router.delete('/:id', eliminarPermiso); // Eliminar permiso por ID

module.exports = router;
