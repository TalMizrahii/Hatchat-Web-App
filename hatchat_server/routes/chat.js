import { Router } from 'express';
import chatController from '../controllers/users.js';


const router = Router();

router.route('/')
    .post(chatController.addNewUser);



export default router;