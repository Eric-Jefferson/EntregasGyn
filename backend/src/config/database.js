const mongoose = require("mongoose");
const { MONGODB_URI } = require("./env");

async function conectarBanco() {
    try {
        await mongoose.connect(MONGODB_URI);

        console.log("✅ MongoDB Atlas conectado com sucesso!");
        console.log(`📦 Banco: ${mongoose.connection.name}`);
        console.log(`🌐 Host: ${mongoose.connection.host}`);

    } catch (error) {
        console.error("❌ Erro ao conectar no MongoDB:");
        console.error(error.message);
        process.exit(1);
    }
}

module.exports = conectarBanco;