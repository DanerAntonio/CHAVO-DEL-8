const jwt = require('jsonwebtoken');

// Middleware para verificar el token JWT
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'Se requiere un token para autenticarse' });
  }

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret');
    req.user = decoded;
  } catch (error) {
    return res.status(401).json({ message: 'Token no válido' });
  }

  return next();
};

module.exports = verifyToken;