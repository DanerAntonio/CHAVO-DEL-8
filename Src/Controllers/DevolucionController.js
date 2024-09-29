const Devolucion = require('../Models/DevolucionModel'); // Asegúrate de que la ruta sea correcta

// Obtener todas las devoluciones
exports.getAllDevoluciones = async (req, res) => {
    try {
        const devoluciones = await Devolucion.find();
        res.status(200).json(devoluciones);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear una nueva devolución
exports.createDevolucion = async (req, res) => {
    const { cedula, codigo_barras, nombre_producto, fecha_compra, fecha_devolucion, cantidad, precio, motivo, estado_envio, estado_pedido } = req.body;

    // Validaciones
    if (!cedula || !codigo_barras || !nombre_producto || !fecha_compra || !fecha_devolucion || !cantidad || !precio || !motivo || !estado_envio || !estado_pedido) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
    }

    const monto_total = cantidad * precio; // Cálculo del monto total

    const newDevolucion = new Devolucion({
        cedula,
        codigo_barras,
        nombre_producto,
        fecha_compra,
        fecha_devolucion,
        cantidad,
        precio,
        monto_total,
        motivo,
        estado_envio,
        estado_pedido,
    });

    try {
        const savedDevolucion = await newDevolucion.save();
        res.status(201).json(savedDevolucion);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Actualizar una devolución por ID
exports.updateDevolucion = async (req, res) => {
    const { id } = req.params;
    const { cedula, codigo_barras, nombre_producto, fecha_compra, fecha_devolucion, cantidad, precio, motivo, estado_envio, estado_pedido } = req.body;

    // Validaciones
    if (!cedula || !codigo_barras || !nombre_producto || !fecha_compra || !fecha_devolucion || !cantidad || !precio || !motivo || !estado_envio || !estado_pedido) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
    }

    const monto_total = cantidad * precio; // Cálculo del monto total

    try {
        const updatedDevolucion = await Devolucion.findByIdAndUpdate(id, {
            cedula,
            codigo_barras,
            nombre_producto,
            fecha_compra,
            fecha_devolucion,
            cantidad,
            precio,
            monto_total,
            motivo,
            estado_envio,
            estado_pedido,
        }, { new: true });

        if (!updatedDevolucion) {
            return res.status(404).json({ message: 'Devolución no encontrada' });
        }

        res.status(200).json(updatedDevolucion);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Eliminar una devolución por ID
exports.deleteDevolucion = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedDevolucion = await Devolucion.findByIdAndDelete(id);
        if (!deletedDevolucion) {
            return res.status(404).json({ message: 'Devolución no encontrada' });
        }

        res.status(204).send(); // No content
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
