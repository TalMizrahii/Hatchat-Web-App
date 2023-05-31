import jwt from 'jsonwebtoken';
import Users from '../models/users.js';
import Authenticator from "../controllers/authenticator.js";


const key = 'y6SNjgPbm3X^x2jgX5nG@8dT2T!D9X';
const generateToken = async (username, password) => {
    try {
        // Find the user in the database based on the provided username
        const user = await Users.findById(username, 'username password');
        const {userName, userPassword} = user;
        // Check if a user with the provided username exists and verify the password
        if (userName ===  username && userPassword === password) {
            const data = {username};
            // Generate the token and return the token
            return jwt.sign(data, key);
        } else {
            // Invalid username/password
            return false;
        }
    } catch (error) {
        console.error(error);
        return false;
    }
};


const verifyToken = (token) => {
    try {
        return jwt.verify(token, key);
    } catch (err) {
        throw new Error('Invalid Token');
    }
};

export default {generateToken, verifyToken}