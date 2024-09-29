const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGO_URI || 'tu_URI_de_mongodb';


const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);  // Sin las opciones que están generando la advertencia
        console.log('Conectado a MongoDB');
    } catch (error) {
        console.error('Error al conectar a MongoDB:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;

