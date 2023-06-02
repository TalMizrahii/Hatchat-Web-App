import Chat from "../models/chat.js";
import User from "../models/users.js";
import Message from "../models/message.js";
import chatService from "./chat.js"


const addMessage = async (id, content, connectUsername) => {

    const chat = await Chat.findOne({"id": id});

    if (chat) {
        if (!await chatService.chatValidation(chat.users[0], chat.users[1], connectUsername)) {
            return false;
        }
        const sender = await User.findOne({"username": connectUsername})
        const maxMessageID = await Message.findOne().sort('-id').limit(1).exec();
        let messageID = 1;
        if (maxMessageID && maxMessageID.id) {
            messageID = maxMessageID.id + 1;
        }
        const newMessage = await new Message({
            "id": messageID,
            "sender": sender,
            "content": content
        });

        const returnVal = {
            "id": messageID,
            "created": new Date(),
            "sender": {
                "username": sender.username,
                "displayName": sender.displayName,
                "profilePic": sender.profilePic
            },
            "content": content
        }

        await newMessage.save();
        await newMessage.save();
        chat.messages.push(newMessage);
        await chat.save();
        return returnVal;
    }
    return false;
};

const getMessages = async (id, connectUsername) => {
    const chatArray = []
    const chat = await Chat.findOne({"id": id});
    if (chat) {
        if (await chatService.chatValidation(chat.users[0], chat.users[1], connectUsername)) {
            return false;
        }
        for (const msg of chat.messages) {
            const msg = await Messages.findOne(msg);
            const sender = await User.findOne(msg.sender).populate('username')
            chatArray.push({
                "id": msg.id,
                "created": msg.created,
                "sender": {
                    "username": sender.username
                },
                "content": msg.content
            });
        }
        return chatArray;
    }
    return false;

};

export default {addMessage, getMessages}