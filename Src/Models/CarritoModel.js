const mongoose = require('mongoose');

// Definición del esquema para el modelo Carrito
const carritoSchema = new mongoose.Schema({
  cliente: { 
    nombre: { type: String, required: true },
    numeroDocumento: { type: String, required: true },
    telefono: { type: String, required: true },
    email: { type: String, required: true },
    direccionEnvio: { type: String, required: true }
  },
  productos: [
    {
      productoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto', required: true }, // ID del producto
      nombre: { type: String, required: true },  // Nombre del producto
      precio: { type: Number, required: true, min: 0 },  // Precio del producto
      cantidad: { type: Number, required: true, min: 1 }, // Cantidad del producto
      total: { type: Number, required: true }  // Precio total por producto (precio * cantidad)
    }
  ],
  montoTotal: { type: Number, required: true, min: 0 },  // Monto total del carrito
  metodoPago: { type: String, required: true },  // Método de pago seleccionado
  fechaDeCreacion: { type: Date, default: Date.now }  // Fecha de creación del carrito
});

// Creación del modelo Carrito basado en el esquema
const Carrito = mongoose.model('Carrito', carritoSchema);

module.exports = Carrito;
