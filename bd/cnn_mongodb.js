import mongoose from 'mongoose';
import colors from 'colors';

export let isConected = false;

export const conectarAMongoDB = async () => {
    try {
        const mongoURL = process.env.MONGO_URL;
        
        if (!mongoURL) {
            throw new Error('MONGO_URL no está definida en el archivo .env');
        }
        
        await mongoose.connect(mongoURL);
        
        isConected = true;
        console.log(' Conectado a MongoDB Atlas exitosamente'.green);
        console.log(` Base de datos: misapis`.cyan);
    } catch (error) {
        console.error(' Error al conectar a MongoDB:'.red, error.message);
        isConected = false;
        throw error;
    }
};

// Evento para cuando se desconecte
mongoose.connection.on('disconnected', () => {
    console.log('  Desconectado de MongoDB'.yellow);
    isConected = false;
});

// Evento para errores después de la conexión inicial
mongoose.connection.on('error', (err) => {
    console.error(' Error en la conexión de MongoDB:'.red, err);
});