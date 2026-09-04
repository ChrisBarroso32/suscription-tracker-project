import express from "express"; // Uso de Express.js
import { PORT } from "./config/env.js";
import userRouter from "./routes/user.routes.js";
import subscriptionRouter from "./routes/suscription.routes.js";
import authRouter from "./routes/auth.routes.js";
import connectToMongodb from "./database/mongodb.js";

const app = express();

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/suscriptions', subscriptionRouter);

// Métodos HTTP de la API
app.get("/", (req, res) => {
    res.send("Bienvenidos a Suscription Tracker API.");
});

app.listen(PORT, async () => {
    console.log(`La API esta corriendo en http://localhost:${PORT}`);
    await connectToMongodb();
})

export default app;