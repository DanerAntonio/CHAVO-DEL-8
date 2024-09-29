const Usuario = require('../Models/UsuarioModel');

// Crear un nuevo usuario
exports.createUser = async (req, res) => {
  try {
    const { name, email, status } = req.body;

    // Validación de entrada
    if (!name || !email) {
      return res.status(400).json({ message: 'Nombre y email son obligatorios' });
    }

    const newUser = new Usuario({ name, email, status }); // Cambié User a Usuario
    await newUser.save();
    res.status(201).json({ message: 'Usuario creado', user: newUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener todos los usuarios
exports.getUsers = async (req, res) => {
  try {
    const users = await Usuario.find(); // Cambié User a Usuario
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Actualizar un usuario
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await Usuario.findByIdAndUpdate(id, req.body, { new: true }); // Cambié User a Usuario
    if (!updatedUser) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json({ message: 'Usuario actualizado', user: updatedUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar un usuario
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await Usuario.findByIdAndDelete(id); // Cambié User a Usuario
    if (!deletedUser) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json({ message: 'Usuario eliminado' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
