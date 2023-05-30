import { Router } from 'express';
import authenticatorController from '../controllers/authenticator.js';

const router = Router();

router.route('/')
    .post(authenticatorController.processLogin);

router.route('/')
    .get(authenticatorController.isLoggedIn);

export default router;
