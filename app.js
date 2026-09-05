import express from "express"; // Uso de Express.js
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import YAML from 'yamljs'

import { PORT } from "./config/env.js";

import userRouter from "./routes/user.routes.js";
import subscriptionRouter from "./routes/suscription.routes.js";
import authRouter from "./routes/auth.routes.js";
import connectToMongodb from "./database/mongodb.js";
import errorMiddleware from "./middleware/error.middleware.js";
import arcjetMiddleware from "./middleware/arcjet.middleware.js";

const app = express();
const swaggerDocument = YAML.load('./swagger.yaml');

app.use(express.json()); // Procesa los datos enviados en formato JSON.
app.use(express.urlencoded({ extended: false })); // Procesa los datos obtenidos de formularios HTML en un formato simple.
app.use(cookieParser()); // Procesa las cookies que el navegador del cliente envía adjuntas de forma automática en cada petición HTTP.
app.use(arcjetMiddleware);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/suscriptions', subscriptionRouter);

app.use(errorMiddleware);

// Métodos HTTP de la API
app.get("/", (req, res) => {
    res.send("Bienvenidos a Suscription Tracker API.");
});

app.listen(PORT, async () => {
    console.log(`La API esta corriendo en http://localhost:${PORT}`);
    console.log(`Documentación en http://localhost:${PORT}/api-docs`);
    await connectToMongodb();
})

export default app;