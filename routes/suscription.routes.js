import {Router} from "express";

const subscriptionRouter = Router();

subscriptionRouter.get("/", (req, res) => res.send({ title: "GET: Obteniendo todas las suscripciones..." }));
subscriptionRouter.get("/:id", (req, res) => res.send({ title: "GET: Obteniendo suscripción" }));
subscriptionRouter.post("/", (req, res) => res.send({ title: "CREATE: Creando nueva suscripción" }));
subscriptionRouter.put("/:id", (req, res) => res.send({ title: "UPDATE: Actualizando detalles de suscripción" }));
subscriptionRouter.delete("/:id", (req, res) => res.send({ title: "DELETE: Eliminando suscripción..." }));
subscriptionRouter.get("/user/:id", (req, res) => res.send({ title: "GET: Obteniendo suscripción del usuario..." }));
subscriptionRouter.put("/:id/cancel", (req, res) => res.send({ title: "UPDATE/CANCEL: Cancelando suscripción" }));
subscriptionRouter.get("/upcoming-renewals", (req, res) => res.send({ title: "GET: Obteniendo todas las renovaciones de suscripción..." }));

export default subscriptionRouter;