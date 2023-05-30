import { Router } from 'express';
import userController from '../controllers/users.js';

const router = Router();

router.route('/Users')
    .post(userController.addNewUser);

router.route('/Users/:id')
    .get(userController.getUserByUserName);

export default router;
