const mongoose = require('mongoose');

const permisoSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String }  // Puedes hacerlo opcional si lo prefieres
});

module.exports = mongoose.model('Permiso', permisoSchema);
