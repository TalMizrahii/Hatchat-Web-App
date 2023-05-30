import { Router } from 'express';
import { addNewUser } from '../controllers/users.js';

const router = Router();

router.post('/Users', addNewUser);

export default router;
