const mongoose = require('mongoose');
const DetalleVenta = require('../Models/DetalleVentaModel');
const Venta = require('../Models/VentasModel'); // Importar el modelo de Venta
const Producto = require('../Models/ProductoModel'); // Importar el modelo de Producto

// Función para crear un nuevo detalle de venta
const crearDetalleVenta = async (req, res) => {
    const { idVenta, idProducto, cantidad, precioUnitario } = req.body;

    if (!mongoose.Types.ObjectId.isValid(idVenta)) {
        return res.status(400).json({ message: 'idVenta no es un ObjectId válido' });
    }

    if (!mongoose.Types.ObjectId.isValid(idProducto)) {
        return res.status(400).json({ message: 'idProducto no es un ObjectId válido' });
    }

    if (cantidad <= 0) {
        return res.status(400).json({ message: 'La cantidad debe ser mayor que cero' });
    }

    if (precioUnitario < 0) {
        return res.status(400).json({ message: 'El precio unitario no puede ser negativo' });
    }

    const subtotal = cantidad * precioUnitario;

    try {
        // Verificar que la venta y el producto existan
        const venta = await Venta.findById(idVenta);
        const producto = await Producto.findById(idProducto);

        if (!venta) {
            return res.status(404).json({ message: 'Venta no encontrada' });
        }

        if (!producto) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        const detalleVenta = new DetalleVenta({
            idVenta,
            idProducto,
            cantidad,
            precioUnitario,
            subtotal
        });
        await detalleVenta.save();
        res.status(201).json(detalleVenta);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Función para obtener todos los detalles de ventas
const obtenerDetallesVentas = async (req, res) => {
    try {
        const detallesVentas = await DetalleVenta.find().populate('idVenta idProducto');
        res.status(200).json(detallesVentas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Función para anular un detalle de venta
const anularDetalleVenta = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'ID no es un ObjectId válido' });
    }

    try {
        const detalleAnulado = await DetalleVenta.findByIdAndUpdate(
            id,
            { status: 'anulado' }, // Cambiar el estado a "anulado"
            { new: true }
        );

        if (!detalleAnulado) {
            return res.status(404).json({ message: 'Detalle de venta no encontrado' });
        }

        res.status(200).json(detalleAnulado);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Función para actualizar un detalle de venta
const actualizarDetalleVenta = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'ID no es un ObjectId válido' });
    }

    try {
        const { cantidad, precioUnitario } = req.body; // Solo permitimos actualizar estos campos

        const subtotal = cantidad * precioUnitario; // Calcular nuevo subtotal

        const detalleActualizado = await DetalleVenta.findByIdAndUpdate(
            id,
            { cantidad, precioUnitario, subtotal }, // Actualizar subtotal
            { new: true, runValidators: true }
        );

        if (!detalleActualizado) {
            return res.status(404).json({ message: 'Detalle de venta no encontrado' });
        }

        res.status(200).json(detalleActualizado);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Exportar funciones
module.exports = {
    crearDetalleVenta,
    obtenerDetallesVentas,
    anularDetalleVenta,
    actualizarDetalleVenta
};
