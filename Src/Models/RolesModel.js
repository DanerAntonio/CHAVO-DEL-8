const mongoose = require('mongoose');

const rolSchema = new mongoose.Schema({
    nombreRol: { type: String, required: true },
    estadoRol: { 
        type: String, 
        enum: ['activo', 'inactivo'], // Asegúrate de restringir los valores posibles
        required: true 
    },
    permisos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Permiso' }] // Referencia a permisos
});

module.exports = mongoose.model('Rol', rolSchema);
