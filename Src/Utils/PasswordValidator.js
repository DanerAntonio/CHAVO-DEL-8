module.exports = function validatePassword(password) {
  const passwordRegex = /^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/;

  if (!passwordRegex.test(password)) {
    return { valid: false, message: 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.' };
  }

  return { valid: true };
};