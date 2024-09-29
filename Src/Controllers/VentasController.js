const Venta = require('../Models/VentasModel'); 
const Usuario = require('../Models/UsuarioModel'); // Asegúrate de importar el modelo de Usuario
const Producto = require('../Models/ProductoModel'); // Asegúrate de importar el modelo de Producto

// Crear una nueva venta
exports.crearVenta = async (req, res) => {
    const { idUsuario, idProducto, cantidad, precioUnitario } = req.body;

    if (!idUsuario || !idProducto || !cantidad || !precioUnitario) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {
        // Verificar que el usuario y producto existan
        const usuario = await Usuario.findById(idUsuario);
        const producto = await Producto.findById(idProducto);

        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        if (!producto) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        const precioTotal = cantidad * precioUnitario;

        const nuevaVenta = new Venta({ idUsuario, idProducto, cantidad, precioUnitario, precioTotal });
        await nuevaVenta.save();
        res.status(201).json(nuevaVenta);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener todas las ventas
exports.obtenerVentas = async (req, res) => {
    try {
        const ventas = await Venta.find().populate('idUsuario idProducto'); // Población para obtener datos completos
        res.status(200).json(ventas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar una venta por ID
exports.actualizarVenta = async (req, res) => {
    const { id } = req.params; 
    const { cantidad, precioUnitario } = req.body; 

    try {
        const ventaActualizada = await Venta.findByIdAndUpdate(
            id,
            { cantidad, precioUnitario, precioTotal: cantidad * precioUnitario }, 
            { new: true, runValidators: true } 
        );

        if (!ventaActualizada) {
            return res.status(404).json({ message: 'Venta no encontrada' });
        }

        res.status(200).json(ventaActualizada);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Anular una venta por ID
exports.anularVenta = async (req, res) => {
    const { id } = req.params;

    try {
        const ventaAnulada = await Venta.findByIdAndUpdate(
            id,
            { estado: 'anulada' }, 
            { new: true }
        );

        if (!ventaAnulada) {
            return res.status(404).json({ message: 'Venta no encontrada' });
        }

        res.status(200).json(ventaAnulada);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
