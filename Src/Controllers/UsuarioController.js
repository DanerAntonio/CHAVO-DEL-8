const Usuario = require('../Models/UsuarioModel');
const validatePassword = require('../Utils/PasswordValidator');

// Crear un nuevo usuario
exports.createUser = async (req, res) => {
  try {
    const { name, email, password, confirmPassword, status } = req.body;

    // Validación de entrada
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: 'Nombre, email y contraseñas son obligatorios' });
    }

    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Las contraseñas no coinciden' });
    }

    const newUser = new Usuario({ name, email, password, status });
    await newUser.save();
    res.status(201).json({ message: 'Usuario creado', user: newUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener todos los usuarios
exports.getUsers = async (req, res) => {
  try {
    const users = await Usuario.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Actualizar un usuario
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await Usuario.findByIdAndUpdate(id, req.body, { new: true });
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
    const deletedUser = await Usuario.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json({ message: 'Usuario eliminado' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};