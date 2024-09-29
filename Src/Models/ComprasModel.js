const mongoose = require('mongoose');

const comprasSchema = new mongoose.Schema({
    numeroCompra: { type: String, required: true, unique: true }, // Campo único
    numeroFactura: { type: String, required: true, unique: true }, // Campo único
    proveedor: { type: String, required: true },
    montoTotal: { type: Number, required: true, min: 0 }, // Asegúrate de que sea no negativo
    fechaCompra: { type: Date, default: Date.now },
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' } // Asumiendo que tienes una colección de clientes
});

module.exports = mongoose.model('Compras', comprasSchema);
