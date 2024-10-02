const DetalleCompras = require('../Models/DetalleCompraModel');

const Compra = require('../Models/ComprasModel');
const Producto = require('../Models/ProductoModel');

exports.actualizarDetalleCompra = async (req, res) => {
    try {
        // ... (código anterior)

        // Verificar si la compra y el producto existen
        const [compraExiste, productoExiste] = await Promise.all([
            Compra.findById(compraId),
            Producto.findById(productoId)
        ]);

        if (!compraExiste || !productoExiste) {
            return res.status(400).json({ mensaje: 'Compra o Producto no encontrado' });
        }

        // ... (resto del código)
    } catch (error) {
        // ... (manejo de errores)
    }
};

// Crear un nuevo detalle de compra
exports.crearDetalleCompra = async (req, res) => {
    try {
        const { compraId, productoId, cantidad, precio } = req.body;

        if (!compraId || !productoId || !cantidad || !precio) {
            return res.status(400).json({ mensaje: 'Todos los campos son obligatorios.' });
        }

        const total = cantidad * precio;

        const nuevoDetalleCompra = new DetalleCompras({
            compraId,
            productoId,
            cantidad,
            precio,
            total
        });

        const detalleGuardado = await nuevoDetalleCompra.save();
        res.status(201).json(detalleGuardado);
    } catch (error) {
        console.error('Error al crear detalle de compra:', error);
        res.status(500).json({ mensaje: 'Error al crear el detalle de compra', error: error.message });
    }
};

// Obtener todos los detalles de compras
exports.obtenerDetallesCompras = async (req, res) => {
    try {
        const detallesCompras = await DetalleCompras.find()
            .populate('compraId', 'nombre')
            .populate('productoId', 'nombre');
        res.status(200).json(detallesCompras);
    } catch (error) {
        console.error('Error al obtener detalles de compras:', error);
        res.status(500).json({ mensaje: 'Error al obtener los detalles de compras', error: error.message });
    }
};

// Obtener un detalle de compra por ID
exports.obtenerDetalleCompraPorId = async (req, res) => {
    try {
        const detalleCompra = await DetalleCompras.findById(req.params.id)
            .populate('compraId', 'nombre')
            .populate('productoId', 'nombre');
        if (!detalleCompra) {
            return res.status(404).json({ mensaje: 'Detalle de compra no encontrado' });
        }
        res.status(200).json(detalleCompra);
    } catch (error) {
        console.error('Error al obtener detalle de compra:', error);
        res.status(500).json({ mensaje: 'Error al obtener el detalle de compra', error: error.message });
    }
};

// Actualizar un detalle de compra por ID
exports.actualizarDetalleCompra = async (req, res) => {
    try {
        console.log('Datos recibidos para actualizar:', req.params.id, req.body);
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

        const detalleCompraActualizado = await DetalleCompras.findByIdAndUpdate(
            req.params.id,
            { compraId, productoId, cantidad, precio, total },
            { new: true, runValidators: true }
        );

        if (!detalleCompraActualizado) {
            return res.status(404).json({ mensaje: 'Detalle de compra no encontrado' });
        }

        console.log('Detalle actualizado:', detalleCompraActualizado);
        res.status(200).json(detalleCompraActualizado);
    } catch (error) {
        console.error('Error al actualizar detalle de compra:', error);
        res.status(500).json({ 
            mensaje: 'Error al actualizar el detalle de compra', 
            error: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
};

// Eliminar un detalle de compra por ID
exports.eliminarDetalleCompra = async (req, res) => {
    try {
        const detalleCompraEliminado = await DetalleCompras.findByIdAndDelete(req.params.id);
        if (!detalleCompraEliminado) {
            return res.status(404).json({ mensaje: 'Detalle de compra no encontrado' });
        }
        res.status(200).json({ mensaje: 'Detalle de compra eliminado', detalle: detalleCompraEliminado });
    } catch (error) {
        console.error('Error al eliminar detalle de compra:', error);
        res.status(500).json({ mensaje: 'Error al eliminar el detalle de compra', error: error.message });
    }
};