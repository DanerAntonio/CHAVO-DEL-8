const mongoose = require('mongoose');

const VentaSchema = new mongoose.Schema({
    idUsuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true }, 
    idProducto: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto', required: true }, 
    cantidad: { type: Number, required: true, min: 1 }, 
    precioUnitario: { type: Number, required: true, min: 0 },
    precioTotal: { type: Number, required: true, min: 0 }, // Podría ser calculado en el controlador
    fecha: { type: Date, default: Date.now, required: true },
    estado: { type: String, enum: ['activa', 'anulada'], default: 'activa' }
});

module.exports = mongoose.model('Venta', VentaSchema);
