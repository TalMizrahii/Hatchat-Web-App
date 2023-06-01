import userService from '../services/users.js'
import authenticatorService from "../services/authenticator.js";

const addNewUser = async (req, res) => {
    return res.send(await userService.addNewUser(req.body.username, req.body.password, req.body.displayName, req.body.profilePic));
};

const getUserByUsername = async (req, res) => {
    if (req.headers.authorization) {
        // Extract the token from that header
        const token = req.headers.authorization.split(' ')[1];
        const data = authenticatorService.verifyToken(token);
        try {
           if (data){
               console.log('The logged in user is: ' + data.username);
               const user = await userService.getUserByUsername(token.username);
               if (user){
                   return res.send(user);
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



export default {addNewUser, getUserByUserName: getUserByUsername};