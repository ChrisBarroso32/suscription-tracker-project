import {Router} from "express";

const suscriptionRouter = Router();

suscriptionRouter.get("/", (req, res) => res.send({ title: "GET: Obteniendo todas las suscripciones..." }));

export default suscriptionRouter;