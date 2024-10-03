const mongoose = require('mongoose');

const comprasSchema = new mongoose.Schema({
    numeroCompra: { type: String, required: true, unique: true },
    numeroFactura: { type: String, required: true, unique: true },
    proveedor: { type: mongoose.Schema.Types.ObjectId, ref: 'Proveedor', required: true },
    clienteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente', required: true }, // Cambiado a 'Cliente'
    montoTotal: { type: Number, required: true, min: 0 },
    fechaCompra: { type: Date, default: Date.now },
    productos: [{
        productoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto' },
        cantidad: Number,
        precioUnitario: Number
    }]
});

module.exports = mongoose.model('Compras', comprasSchema);