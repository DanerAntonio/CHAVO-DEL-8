const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Compras = require('../Models/ComprasModel');

const DetalleComprasSchema = new Schema({
    compraId: { type: Schema.Types.ObjectId, ref: 'Compras', required: true },
    productoId: { type: Schema.Types.ObjectId, ref: 'Producto', required: true },
    cantidad: { type: Number, required: true, min: 1 }, // Asegúrate de que sea mayor que 0
    precio: { type: Number, required: true, min: 0 }, // Asegúrate de que no sea negativo
    total: { type: Number, required: true }, // Se calculará automáticamente
    fecha: { type: Date, default: Date.now }
});

module.exports = mongoose.model('DetalleCompras', DetalleComprasSchema);
