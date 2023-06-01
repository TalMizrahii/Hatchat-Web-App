import { Router } from 'express';
import chatController from '../controllers/chat.js';
import {get} from "mongoose";


const router = Router();

router.route('/')
    .post(chatController.addNewChat)
    .get(chatController.getAllChats);



export default router;