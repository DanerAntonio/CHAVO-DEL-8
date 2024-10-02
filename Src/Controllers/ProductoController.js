// ProductoController.js

const Producto = require('../Models/ProductoModel');

// Crear un nuevo producto
exports.crearProducto = async (req, res) => {
    const { id_categoria, nombre, descripcion, fecha_vencimiento, stock, precio, estado } = req.body;

    // Validación de entrada
    if (!nombre || !precio || !stock) {
        return res.status(400).json({ mensaje: 'Nombre, precio y stock son obligatorios' });
    }

    try {
        const nuevoProducto = new Producto({ id_categoria, nombre, descripcion, fecha_vencimiento, stock, precio, estado });
        await nuevoProducto.save();
        res.status(201).json(nuevoProducto);
    } catch (error) {
        console.error(error); // Log del error para depuración
        res.status(500).json({ mensaje: 'Error al crear el producto', error: error.message });
    }
};

// Obtener todos los productos
exports.obtenerTodosLosProductos = async (req, res) => {
    try {
        const productos = await Producto.find().populate('id_categoria');
        res.status(200).json(productos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener productos', error: error.message });
    }
};

// Obtener un producto por su ID
exports.obtenerProductoPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const producto = await Producto.findById(id).populate('id_categoria');
        if (!producto) return res.status(404).json({ mensaje: 'Producto no encontrado' });
        res.status(200).json(producto);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener el producto', error: error.message });
    }
};

// Actualizar un producto
exports.actualizarProducto = async (req, res) => {
    const { id } = req.params;
    const { id_categoria, nombre, descripcion, fecha_vencimiento, stock, precio, estado } = req.body;

    // Validación de entrada
    if (!nombre || !precio || !stock) {
        return res.status(400).json({ mensaje: 'Nombre, precio y stock son obligatorios' });
    }

    try {
        const productoActualizado = await Producto.findByIdAndUpdate(id, { id_categoria, nombre, descripcion, fecha_vencimiento, stock, precio, estado }, { new: true });
        if (!productoActualizado) return res.status(404).json({ mensaje: 'Producto no encontrado' });
        res.status(200).json(productoActualizado);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al actualizar el producto', error: error.message });
    }
};

// Eliminar un producto
exports.eliminarProducto = async (req, res) => {
    const { id } = req.params;
    try {
        const productoEliminado = await Producto.findByIdAndDelete(id);
        if (!productoEliminado) return res.status(404).json({ mensaje: 'Producto no encontrado' });
        res.status(200).json({ mensaje: 'Producto eliminado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al eliminar el producto', error: error.message });
    }
};
