const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/Api/Carrito', require('./Src/Routes/CarritoRoutes')); // SI
app.use('/Api/CategoriaProducto', require('./Src/Routes/CategoriaProductoRoutes')); // SI
app.use('/Api/Cliente', require('./Src/Routes/ClienteRoutes')); // SI
app.use('/Api/Compras', require('./Src/Routes/ComprasRoutes')); // SI
app.use('/Api/DetalleCompra', require('./Src/Routes/DetalleCompraRoutes')); // NO
app.use('/Api/DetalleVenta', require('./Src/Routes/DetalleVentaRoutes')); // SI
app.use('/Api/Devolucion', require('./Src/Routes/DevolucionRoutes')); // SI
app.use('/Api/Pedido', require('./Src/Routes/PedidoRoutes')); // SI
app.use('/Api/Permisos', require('./Src/Routes/PermisosRoutes')); // SI
app.use('/Api/Producto', require('./Src/Routes/ProductoRoutes')); // SI
app.use('/Api/Proveedor', require('./Src/Routes/ProveedorRoutes')); // SI
app.use('/Api/Roles', require('./Src/Routes/RolesRoutes')); // SI
app.use('/Api/Usuario', require('./Src/Routes/UsuarioRoutes')); // SI
app.use('/Api/Ventas', require('./Src/Routes/VentasRoutes')); // SI

// Middleware para manejar rutas no encontradas
app.use((req, res, next) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

// Middleware para manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Error interno del servidor' });
});

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Conectado a MongoDB');
    // Iniciar el servidor
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error de conexión a MongoDB:', err);
    if (err.name === 'MongooseServerSelectionError') {
      console.log('No se pudo conectar a MongoDB. Verifica tu conexión a internet y la configuración del servidor.');
    }
  });
