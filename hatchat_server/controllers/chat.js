import ChatServices from "../services/chat.js";
import authenticatorService from "../services/authenticator.js";
import {json} from "express";


const addNewChat = async (req, res) => {
    if (req.headers.authorization) {
        // Extract the token from that header
        const token = req.headers.authorization.split(' ')[1];
        const data = authenticatorService.verifyToken(token);
        try {
            if (data) {
                console.log('The logged in user is: ' + data.username);
                const chat = await ChatServices.addNewChat(req.body.username, data.username);
                if (chat) {
                    res.send(chat);
                } else {
                    return res.status(401).json({errors: ['Unauthorized']});
                }
            }
        } catch (err) {
            return res.status(401).json({errors: ['Unauthorized']});
        }
    } else {
        return res.status(401).json({errors: ['Unauthorized']});
    }
};

const getAllChats = async (req, res) => {
    if (req.headers.authorization) {
        // Extract the token from that header
        const token = req.headers.authorization.split(' ')[1];
        const data = authenticatorService.verifyToken(token);
        try {
            if (data) {
                console.log('The logged in user is: ' + data.username);
                const chats = await ChatServices.getAllChats(data.username);
                if (chats) {
                    res.send(chats);
                } else {
                    return res.status(401).json({errors: ['Unauthorized']});
                }
            }
        } catch (err) {
            return res.status(401).json({errors: ['Unauthorized']});
        }
    } else {
        return res.status(401).json({errors: ['Unauthorized']});
    }
};

export default {addNewChat, getAllChats}