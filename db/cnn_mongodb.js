

import mongoose from 'mongoose';

let isConnected = false;

const conectarAMongoDB = async () => {
    // 1. Lógica para evitar conexiones duplicadas
    if (isConnected) {
        console.log('Ya esta conectado a MongoDB'.green);
        return;
    }

    try {
        // 2. Intento de conexión inicial
        await mongoose.connect(process.env.MONGO_URI); // Se asume MONGO_URI está aquí

        isConnected = true;
        console.log('Conectado a MongoDB'.yellow);
    } catch (error) {
        console.log('Error al conectar a MongoDB'.red);
    }
}

const db = mongoose.connection;

// 3. Manejo de eventos de la conexión
db.on('error', (error) => {
    isConnected = false;
    console.log('Error al conectar a MongoDB'.red);
});

db.once('open', () => {
    isConnected = true;
});

db.on('disconnected', () => {
    isConnected = false;
    console.log('Desconectado de MongoDB'.yellow);
});

// 4. Cierre elegante de la conexión al apagar la aplicación
process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('MongoDB desconectado'.yellow);
    process.exit(0);
});
export { conectarAMongoDB, isConnected }