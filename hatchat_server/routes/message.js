import { Router } from 'express';
import messageController from '../controllers/message.js';


const router = Router();

router.route('/')
    .post(messageController.addMessage)
    .get(messageController.getMessage);

;

export default router;