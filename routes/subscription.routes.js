import { Router } from "express";
import authorize from "../middleware/auth.middleware.js";
import { getUserSubscriptions, createSubscription } from "../controllers/subscription.controller.js";

const subscriptionRouter = Router();

subscriptionRouter.get("/", (req, res) => res.send({ title: "GET: Obteniendo todas las suscripciones..." }));
subscriptionRouter.get("/:id", (req, res) => res.send({ title: "GET: Obteniendo suscripción" }));
subscriptionRouter.post("/", authorize, createSubscription);
subscriptionRouter.put("/:id", (req, res) => res.send({ title: "UPDATE: Actualizando detalles de suscripción" }));
subscriptionRouter.delete("/:id", getUserSubscriptions);
subscriptionRouter.get("/user/:id", (req, res) => res.send({ title: "GET: Obteniendo suscripción del usuario..." }));
subscriptionRouter.put("/:id/cancel", (req, res) => res.send({ title: "UPDATE/CANCEL: Cancelando suscripción" }));
subscriptionRouter.get("/upcoming-renewals", (req, res) => res.send({ title: "GET: Obteniendo todas las renovaciones de suscripción..." }));

export default subscriptionRouter;