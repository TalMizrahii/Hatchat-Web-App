import ChatServices from "../services/chat.js";
import authenticatorService from "../services/authenticator.js";


const addNewChat = async (req, res) => {
    if (req.headers.authorization) {
        // Extract the token from that header
        const token = req.headers.authorization.split(' ')[1];
        const data = authenticatorService.verifyToken(token);
        try {
            if (data){
                console.log('The logged in user is: ' + data.username);
                const chat = await ChatServices.addNewChat(req.body.username);
                if (chat){
                    res.json(chat);
                }else{
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

export default {addNewChat}