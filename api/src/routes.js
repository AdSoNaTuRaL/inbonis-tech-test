import { Router } from 'express';
import { UserController } from './controllers/UserController.js';

const router = Router();

const userController = new UserController();

router.post('/user/:username', userController.execute);

export { router };
