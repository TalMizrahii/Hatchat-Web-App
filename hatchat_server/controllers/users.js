import userService from '../services/users.js'
import authenticatorService from "../services/authenticator.js";

const addNewUser = async (req, res) => {
    res.json(await userService.addNewUser(req.body.userName, req.body.password, req.body.displayName, req.body.profilePic));
};

const getUserByUserName = async (req, res) => {
    if (req.headers.authorization) {
        // Extract the token from that header
        const token = req.headers.authorization.split(' ')[1];
        const data = authenticatorService.verifyToken(token);
        try {
           if (data){
               console.log('The logged in user is: ' + data.username);
               const user = await userService.getUserByUserName(token.username);
               if (user){
                   res.json(user);
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



export default {addNewUser, getUserByUserName};