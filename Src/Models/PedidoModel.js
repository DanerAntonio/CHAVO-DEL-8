const mongoose = require('mongoose');

const pedidoSchema = new mongoose.Schema({
  cliente: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente', required: true }, // Cambiar a referencia
  cantidad: { 
    type: Number, 
    required: true,
    min: 1 // Validación para que la cantidad sea al menos 1
  },
  montoTotal: { 
    type: Number, 
    required: true,
    min: 0 // Validación para que el monto total no sea negativo
  },
  fechaDePedido: { type: Date, default: Date.now },
  estadoDelPedido: { 
    type: String, 
    required: true,
    enum: ['pendiente', 'completado', 'cancelado'],
    default: 'pendiente'
  }
});

const Pedido = mongoose.model('Pedido', pedidoSchema);

module.exports = Pedido;
