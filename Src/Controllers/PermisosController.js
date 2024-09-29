const Permiso = require('../Models/PermisosModel');

// Crear un nuevo permiso
exports.crearPermiso = async (req, res) => {
    const { nombre, descripcion } = req.body;

    if (!nombre) {
        return res.status(400).json({ message: 'El nombre del permiso es obligatorio' });
    }

    try {
        const nuevoPermiso = new Permiso({ nombre, descripcion });
        await nuevoPermiso.save();
        res.status(201).json(nuevoPermiso);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear permiso: ' + error.message });
    }
};

// Obtener todos los permisos
exports.obtenerPermisos = async (req, res) => {
    try {
        const permisos = await Permiso.find();
        res.status(200).json(permisos);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener permisos: ' + error.message });
    }
};

// Actualizar un permiso
exports.actualizarPermiso = async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;

    try {
        const permisoActualizado = await Permiso.findByIdAndUpdate(id, { nombre, descripcion }, { new: true });
        if (!permisoActualizado) {
            return res.status(404).json({ message: 'Permiso no encontrado' });
        }
        res.status(200).json(permisoActualizado);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar permiso: ' + error.message });
    }
};

// Eliminar un permiso
exports.eliminarPermiso = async (req, res) => {
    const { id } = req.params;
    try {
        const permisoEliminado = await Permiso.findByIdAndDelete(id);
        if (!permisoEliminado) {
            return res.status(404).json({ message: 'Permiso no encontrado' });
        }
        res.status(200).json({ message: 'Permiso eliminado con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar permiso: ' + error.message });
    }
};
