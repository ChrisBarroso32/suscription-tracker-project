import { Router } from 'express';

const userRouter = Router();

userRouter.get('/', (req, res) => { res.send({ title: 'GET: Obteniendo todos los usuarios...' }); });

userRouter.get('/:id', (req, res) => { res.send({ title: 'GET: Datos del usuario' }); });

userRouter.post('/', (req, res) => { res.send({ title: 'CREATE: Creando nuevo usuario' }); });

userRouter.put('/:id', (req, res) => { res.send({ title: 'UPDATE: Actualizando datos del usuario' }); });

userRouter.delete('/:id', (req, res) => { res.send({ title: 'DELETE: Eliminando usuario' }); });

export default userRouter;