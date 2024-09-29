const Compras = require('../Models/ComprasModel');

// Crear una compra
exports.createCompra = async (req, res) => {
    const { numeroCompra, numeroFactura, proveedor, montoTotal, clientId } = req.body;

    // Validaciones
    if (!numeroCompra || !numeroFactura || !proveedor || montoTotal === undefined) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
    }

    if (montoTotal < 0) {
        return res.status(400).json({ message: 'El monto total no puede ser negativo.' });
    }

    try {
        const nuevaCompra = new Compras({ numeroCompra, numeroFactura, proveedor, montoTotal, clientId });
        await nuevaCompra.save();
        res.status(201).json(nuevaCompra);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener todas las compras
exports.obtenerCompras = async (req, res) => {
    try {
        const compras = await Compras.find();
        if (compras.length === 0) {
            return res.status(404).json({ message: 'No se encontraron compras.' });
        }
        res.status(200).json(compras);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener compra por ID
exports.getCompraById = async (req, res) => {
    try {
        const compra = await Compras.findById(req.params.id).populate('clientId');
        if (!compra) {
            return res.status(404).json({ message: 'Compra no encontrada.' });
        }
        res.status(200).json(compra);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar una compra
exports.updateCompra = async (req, res) => {
    try {
        const compra = await Compras.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!compra) {
            return res.status(404).json({ message: 'Compra no encontrada.' });
        }
        res.status(200).json(compra);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar una compra
exports.deleteCompra = async (req, res) => {
    try {
        const compra = await Compras.findByIdAndDelete(req.params.id);
        if (!compra) {
            return res.status(404).json({ message: 'Compra no encontrada.' });
        }
        res.status(200).json({ message: 'Compra eliminada' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
