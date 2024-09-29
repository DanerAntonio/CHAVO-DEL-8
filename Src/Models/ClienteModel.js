const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    correo: { 
        type: String, 
        required: true,
        validate: {
            validator: function(v) {
                return /^\S+@\S+\.\S+$/.test(v); // Validación simple de correo
            },
            message: props => `${props.value} no es un correo válido!`
        }
    },
    telefono: { 
        type: String, 
        required: true,
        validate: {
            validator: function(v) {
                return /^\d+$/.test(v); // Validación simple para solo números
            },
            message: props => `${props.value} no es un número de teléfono válido!`
        }
    },
    direccion: { type: String, required: true },
    estado: { type: String, enum: ['activo', 'inactivo'], default: 'activo' }
});

module.exports = mongoose.model('Cliente', clienteSchema);
