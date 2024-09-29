const CategoriaProducto = require('../Models/CategoriaProductoModel');

// Obtener todas las categorías de producto
exports.obtenerCategoriasProducto = async (req, res) => {
    try {
        const categorias = await CategoriaProducto.find();
        res.status(200).json(categorias);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear una nueva categoría de producto
exports.createCategoria = async (req, res) => {
    const nuevaCategoria = new CategoriaProducto(req.body);
    try {
        const categoriaGuardada = await nuevaCategoria.save();
        res.status(201).json(categoriaGuardada);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Obtener una categoría de producto por ID
exports.getCategoriaById = async (req, res) => {
    try {
        const categoria = await CategoriaProducto.findById(req.params.id);
        if (!categoria) {
            return res.status(404).json({ message: 'Categoría no encontrada.' });
        }
        res.status(200).json(categoria);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar una categoría de producto
exports.updateCategoria = async (req, res) => {
    try {
        const categoriaActualizada = await CategoriaProducto.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!categoriaActualizada) {
            return res.status(404).json({ message: 'Categoría no encontrada.' });
        }
        res.status(200).json(categoriaActualizada);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar una categoría de producto
exports.deleteCategoria = async (req, res) => {
    try {
        const categoriaEliminada = await CategoriaProducto.findByIdAndDelete(req.params.id);
        if (!categoriaEliminada) {
            return res.status(404).json({ message: 'Categoría no encontrada.' });
        }
        res.status(200).json({ message: 'Categoría eliminada correctamente.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};