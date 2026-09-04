import { Router } from 'express';

import { getUser, getUsers } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get('/', getUsers);

userRouter.get('/:id', getUser);

userRouter.post('/', (req, res) => { res.send({ title: 'CREATE: Creando nuevo usuario' }); });

userRouter.put('/:id', (req, res) => { res.send({ title: 'UPDATE: Actualizando datos del usuario' }); });

userRouter.delete('/:id', (req, res) => { res.send({ title: 'DELETE: Eliminando usuario' }); });

export default userRouter;