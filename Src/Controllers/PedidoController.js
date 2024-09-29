const Pedido = require('../Models/PedidoModel');

// Crear un nuevo pedido
exports.crearPedido = async (req, res) => {
  try {
    const nuevoPedido = new Pedido(req.body);
    await nuevoPedido.save();
    res.status(201).json(nuevoPedido);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al crear el pedido', error: error.message });
  }
};

// Obtener todos los pedidos
exports.obtenerPedidos = async (req, res) => {
  try {
    const pedidos = await Pedido.find().populate('cliente'); // Población para obtener datos del cliente
    res.status(200).json(pedidos);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al obtener los pedidos', error: error.message });
  }
};

// Obtener un pedido por ID
exports.obtenerPedidoPorId = async (req, res) => {
  try {
    const pedido = await Pedido.findById(req.params.id).populate('cliente');
    if (!pedido) {
      return res.status(404).json({ mensaje: 'Pedido no encontrado' });
    }
    res.status(200).json(pedido);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al obtener el pedido', error: error.message });
  }
};

// Actualizar un pedido
exports.actualizarPedido = async (req, res) => {
  try {
    const pedidoActualizado = await Pedido.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!pedidoActualizado) {
      return res.status(404).json({ mensaje: 'Pedido no encontrado' });
    }
    res.status(200).json(pedidoActualizado);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al actualizar el pedido', error: error.message });
  }
};

// Eliminar un pedido
exports.eliminarPedido = async (req, res) => {
  try {
    const pedidoEliminado = await Pedido.findByIdAndDelete(req.params.id);
    if (!pedidoEliminado) {
      return res.status(404).json({ mensaje: 'Pedido no encontrado' });
    }
    res.status(200).json({ mensaje: 'Pedido eliminado' });
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al eliminar el pedido', error: error.message });
  }
};
