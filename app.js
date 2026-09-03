import express from "express"; // Uso de Express.js
import { PORT } from "./config/env.js"; // Uso de variables de entorno

const app = express();

// Métodos HTTP de la API
app.get("/", (req, res) => {
    res.send("Bienvenidos a Suscription Tracker API.");
});

app.listen(PORT, () => {
    console.log(`La API esta corriendo en http://localhost:${PORT}`);
})

export default app;