import { Router } from 'express';

const authRouter = Router();

authRouter.post('/sign-in', (req, res) => res.send({ title: 'Resgitrar'}));
authRouter.post('/sign-up', (req, res) => res.send({ title: 'Iniciar Sesion'}));
authRouter.post('/sign-out', (req, res) => res.send({ title: 'Resgitrar'}));

export default authRouter;