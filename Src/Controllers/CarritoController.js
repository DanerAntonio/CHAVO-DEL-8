const Carrito = require('../Models/CarritoModel');

// Función para calcular el monto total del carrito
const calcularMontoTotal = (productos) => {
    return productos.reduce((total, producto) => total + producto.total, 0);
};

// Crear un nuevo carrito
exports.crearCarrito = async (req, res) => {
    const { cliente, productos, metodoPago } = req.body;

    // Validaciones
    if (!cliente || !productos || !metodoPago) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
    }

    const productosConTotal = productos.map(prod => ({
        ...prod,
        total: prod.precio * prod.cantidad // Calcular el total por producto
    }));

    const montoTotal = calcularMontoTotal(productosConTotal);

    try {
        const nuevoCarrito = new Carrito({ cliente, productos: productosConTotal, montoTotal, metodoPago });
        await nuevoCarrito.save();
        res.status(201).json(nuevoCarrito);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el carrito', error: error.message });
    }
};

// Obtener todos los carritos
exports.obtenerCarritos = async (req, res) => {
    try {
        const carritos = await Carrito.find();
        res.status(200).json(carritos);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los carritos', error: error.message });
    }
};

// Obtener un carrito por ID
exports.obtenerCarritoPorId = async (req, res) => {
    try {
        const carrito = await Carrito.findById(req.params.id);
        if (!carrito) return res.status(404).json({ message: 'Carrito no encontrado' });
        res.status(200).json(carrito);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el carrito', error: error.message });
    }
};

// Actualizar un carrito por ID
exports.actualizarCarrito = async (req, res) => {
    const { productos } = req.body;

    // Validaciones
    if (productos) {
        const productosConTotal = productos.map(prod => ({
            ...prod,
            total: prod.precio * prod.cantidad // Calcular el total por producto
        }));

        const montoTotal = calcularMontoTotal(productosConTotal);

        try {
            const carritoActualizado = await Carrito.findByIdAndUpdate(
                req.params.id,
                { ...req.body, productos: productosConTotal, montoTotal },
                { new: true }
            );
            if (!carritoActualizado) return res.status(404).json({ message: 'Carrito no encontrado' });
            res.status(200).json(carritoActualizado);
        } catch (error) {
            res.status(500).json({ message: 'Error al actualizar el carrito', error: error.message });
        }
    } else {
        res.status(400).json({ message: 'No se proporcionaron productos para actualizar.' });
    }
};

// Eliminar un carrito por ID
exports.eliminarCarrito = async (req, res) => {
    try {
        const carritoEliminado = await Carrito.findByIdAndDelete(req.params.id);
        if (!carritoEliminado) return res.status(404).json({ message: 'Carrito no encontrado' });
        res.status(200).json({ message: 'Carrito eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el carrito', error: error.message });
    }
};
