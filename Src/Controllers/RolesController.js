const Rol = require('../Models/RolesModel'); 
const Permiso = require('../Models/PermisosModel'); 

// Crear un nuevo rol
exports.crearRol = async (req, res) => {
    const { nombreRol, estadoRol, permisos } = req.body;

    if (!nombreRol || !estadoRol || !Array.isArray(permisos)) {
        return res.status(400).json({ message: 'El nombre, estado y permisos son obligatorios y permisos deben ser un arreglo' });
    }

    try {
        const nuevoRol = new Rol({ nombreRol, estadoRol, permisos });
        await nuevoRol.save();

        // Población para obtener los nombres de los permisos
        const rolConPermisos = await Rol.findById(nuevoRol._id).populate('permisos');
        res.status(201).json(rolConPermisos); 
    } catch (error) {
        res.status(500).json({ message: 'Error al crear rol: ' + error.message });
    }
};

// Obtener Roles
exports.obtenerRoles = async (req, res) => {
    try {
        const roles = await Rol.find().populate('permisos');
        res.status(200).json(roles);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener roles: ' + error.message });
    }
};

// Actualizar Rol
exports.actualizarRol = async (req, res) => {
    const { id } = req.params;
    try {
        const rolActualizado = await Rol.findByIdAndUpdate(id, req.body, { new: true }).populate('permisos');
        if (!rolActualizado) {
            return res.status(404).json({ message: 'Rol no encontrado' });
        }
        res.status(200).json(rolActualizado);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar rol: ' + error.message });
    }
};

// Eliminar Rol
exports.eliminarRol = async (req, res) => {
    const { id } = req.params;
    try {
        const rolEliminado = await Rol.findByIdAndDelete(id);
        if (!rolEliminado) {
            return res.status(404).json({ message: 'Rol no encontrado' });
        }
        res.status(200).json({ message: 'Rol eliminado con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar rol: ' + error.message });
    }
};
