const {Router} = require('express');
const chatController = require('../controllers/chat');
const messageController = require("../controllers/message");


const router = Router();

router.route('/')
    .post(chatController.addNewChat)
    .get(chatController.getAllChats);

router.route('/:id')
    .get(chatController.getChatByID)
    .delete(chatController.deleteChatByID);

router.route('/:id/Messages')
    .post(messageController.addMessage)
    .get(messageController.getMessage);

module.exports = router;