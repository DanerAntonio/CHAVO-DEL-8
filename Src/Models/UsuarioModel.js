const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function(v) {
        return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
      },
      message: props => `${props.value} no es un correo válido!`
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 8  // Al menos 8 caracteres
  },
  status: {
    type: String,
    enum: ['activo', 'inactivo'],
    default: 'activo'
  }
}, { timestamps: true });

module.exports = mongoose.model('Usuario', usuarioSchema);