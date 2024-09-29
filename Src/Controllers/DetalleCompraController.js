const DetalleCompras = require('../Models/DetalleCompraModel');

// Crear un nuevo detalle de compra
exports.crearDetalleCompra = async (req, res) => {
    const { compraId, productoId, cantidad, precio } = req.body;

    // Validaciones
    if (!compraId || !productoId || !cantidad || !precio) {
        return res.status(400).json({ mensaje: 'Todos los campos son obligatorios.' });
    }
    if (cantidad < 1) {
        return res.status(400).json({ mensaje: 'La cantidad debe ser mayor que cero.' });
    }
    if (precio < 0) {
        return res.status(400).json({ mensaje: 'El precio no puede ser negativo.' });
    }

    const total = cantidad * precio;

    try {
        const nuevoDetalleCompra = new DetalleCompras({
            compraId,
            productoId,
            cantidad,
            precio,
            total
        });
        await nuevoDetalleCompra.save();
        res.status(201).json(nuevoDetalleCompra);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener todos los detalles de compras
exports.obtenerDetallesCompras = async (req, res) => {
    try {
        const detallesCompras = await DetalleCompras.find()
            .populate('compraId')
            .populate('productoId');
        res.status(200).json(detallesCompras);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener un detalle de compra por ID
exports.obtenerDetalleCompraPorId = async (req, res) => {
    try {
        const detalleCompra = await DetalleCompras.findById(req.params.id)
            .populate('compraId')
            .populate('productoId');
        if (!detalleCompra) return res.status(404).json({ mensaje: 'Detalle de compra no encontrado' });
        res.status(200).json(detalleCompra);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar un detalle de compra por ID
exports.actualizarDetalleCompra = async (req, res) => {
    try {
        const { cantidad, precio } = req.body;

        // Validaciones
        if (cantidad < 1) {
            return res.status(400).json({ mensaje: 'La cantidad debe ser mayor que cero.' });
        }
        if (precio < 0) {
            return res.status(400).json({ mensaje: 'El precio no puede ser negativo.' });
        }

        const total = cantidad * precio;

        const detalleCompraActualizado = await DetalleCompras.findByIdAndUpdate(
            req.params.id,
            { ...req.body, total }, // Actualiza total aquí
            { new: true }
        );
        if (!detalleCompraActualizado) return res.status(404).json({ mensaje: 'Detalle de compra no encontrado' });
        res.status(200).json(detalleCompraActualizado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar un detalle de compra por ID
exports.eliminarDetalleCompra = async (req, res) => {
    try {
        const detalleCompraEliminado = await DetalleCompras.findByIdAndDelete(req.params.id);
        if (!detalleCompraEliminado) return res.status(404).json({ mensaje: 'Detalle de compra no encontrado' });
        res.status(200).json({ mensaje: 'Detalle de compra eliminado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
