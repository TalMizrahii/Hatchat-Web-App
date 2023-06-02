import { Router } from 'express';
import chatController from '../controllers/chat.js';


const router = Router();

router.route('/')
    .post(chatController.addNewChat)
    .get(chatController.getAllChats);

router.route('/:id')
    .get(chatController.getChatByID)
    .delete(chatController.deleteChatByID);

export default router;