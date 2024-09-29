const mongoose = require('mongoose');

const categoriaSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    descripcion: {
        type: String,
        required: true,
        trim: true
    },
    status: { // Opcional: para manejar el estado activo/inactivo
        type: String,
        enum: ['activo', 'inactivo'],
        default: 'activo'
    }
});

module.exports = mongoose.model('Categoria', categoriaSchema);
