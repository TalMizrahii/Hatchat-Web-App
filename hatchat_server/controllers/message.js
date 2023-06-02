import authenticatorService from "../services/authenticator.js";
import MessageService from "../services/message.js";

const addMessage = async (req, res) => {
    if (req.headers.authorization) {
        // Extract the token from that header
        const token = req.headers.authorization.split(' ')[1];
        const data = authenticatorService.verifyToken(token);
        try {
            if (data) {
                console.log('The logged in user is: ' + data.username);
                const message = await MessageService.addMessage(req.body.id, req.body.content, data.username);
                if (message) {
                    return res.send(message);
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
}

const getMessage = async (req, res) => {
    if (req.headers.authorization) {
        // Extract the token from that header
        const token = req.headers.authorization.split(' ')[1];
        const data = authenticatorService.verifyToken(token);
        try {
            if (data) {
                console.log('The logged in user is: ' + data.username);
                const message = await MessageService.getMessages(req.body.id, data.username);
                if (message) {
                    return res.send(message);
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
}


export default {addMessage, getMessage}