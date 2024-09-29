const mongoose = require('mongoose');

const DetalleVentaSchema = new mongoose.Schema({
    idVenta: { type: mongoose.Schema.Types.ObjectId, ref: 'Venta', required: true }, // Referencia a 'Venta'
    idProducto: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto', required: true }, // Cambiado a ObjectId
    cantidad: { type: Number, required: true, min: 1 },
    precioUnitario: { type: Number, required: true, min: 0 },
    subtotal: { type: Number, required: true, min: 0 },
    status: { type: String, enum: ['activo', 'anulado'], default: 'activo' } // Nuevo campo de estado
});

module.exports = mongoose.model('DetalleVenta', DetalleVentaSchema);
