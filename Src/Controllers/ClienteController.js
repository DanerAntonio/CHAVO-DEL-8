const Cliente = require('../Models/ClienteModel');

// Crear un nuevo cliente
exports.crearCliente = async (req, res) => {
    try {
        const nuevoCliente = new Cliente(req.body);
        await nuevoCliente.save();
        res.status(201).json(nuevoCliente);
    } catch (error) {
        res.status(400).json({ error: 'Error al crear cliente: ' + error.message });
    }
};

// Obtener todos los clientes
exports.obtenerClientes = async (req, res) => {
    try {
        const clientes = await Cliente.find();
        res.status(200).json(clientes);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener clientes: ' + error.message });
    }
};

// Obtener un cliente por ID
exports.obtenerClientePorId = async (req, res) => {
    try {
        const cliente = await Cliente.findById(req.params.id);
        if (!cliente) {
            return res.status(404).json({ mensaje: 'Cliente no encontrado' });
        }
        res.status(200).json(cliente);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener cliente: ' + error.message });
    }
};

// Actualizar un cliente por ID
exports.actualizarCliente = async (req, res) => {
    try {
        const clienteActualizado = await Cliente.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!clienteActualizado) {
            return res.status(404).json({ mensaje: 'Cliente no encontrado' });
        }
        res.status(200).json(clienteActualizado);
    } catch (error) {
        res.status(400).json({ error: 'Error al actualizar cliente: ' + error.message });
    }
};

// Eliminar un cliente por ID
exports.eliminarCliente = async (req, res) => {
    try {
        const clienteEliminado = await Cliente.findByIdAndDelete(req.params.id);
        if (!clienteEliminado) {
            return res.status(404).json({ mensaje: 'Cliente no encontrado' });
        }
        res.status(200).json({ mensaje: 'Cliente eliminado' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar cliente: ' + error.message });
    }
};
