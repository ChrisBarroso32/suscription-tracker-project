import mongoose from "mongoose";
import {DB_URI, NODE_ENV} from "../config/env.js";

if (!DB_URI) {
    throw new Error('Error: Establezca la MONGODB_URI dentro de .env.(development/productio).local.');
}

const connectToMongodb = async () => {
    try {
        await mongoose.connect(DB_URI);

        console.log(`Conectado a la base de datos en modo de ${NODE_ENV}`);
    } catch(error) {
        console.error("Error al conectarse con la base de datos: ", error);

        process.exit(1);
    }
};

export default connectToMongodb;