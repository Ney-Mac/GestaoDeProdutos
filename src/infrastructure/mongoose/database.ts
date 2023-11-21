import mongoose from "mongoose";

const BD_URL = 'mongodb://127.0.0.1:27017/';

const connectToDatabase = async (): Promise<void> => {
    try {
        await mongoose.connect(BD_URL);
        console.log('Conexão com o banco de dados estabelecida');
    } catch (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        process.exit(1);
    }
}

export default connectToDatabase;