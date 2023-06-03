import Users from "../models/users.js";
import defaultProfilePic from '../defaultProfilePic.js';

const isValidBase64 = (value) => {
    try {
        Buffer.from(value, 'base64');
        return true;
    } catch (error) {
        return false;
    }
};

const addNewUser = async (username, password, displayName, profilePic) => {
    if (profilePic && !isValidBase64(profilePic)) {
        throw new Error('Invalid base64 string for profilePic');
    }
    if (profilePic === "" || profilePic === null){
        profilePic = defaultProfilePic;
    }


    const newUser = new Users({
        username: username,
        password: password,
        displayName: displayName,
        profilePic: profilePic,
    });

    try {
        // Handle successful save
        return await newUser.save();
    } catch (error) {
        // Handle the error
        console.error(error);
        return {
            title: 'Conflict',
            status: 409,
        };
    }
};


const getUserByUsername = async (id) => {

    const user = await Users.findOne(id).populate( 'username displayName profilePic');
    if (!user) {
        console.error('User not found');
        return false;
    }
    const {username,displayName, profilePic} = user;
    return {
        username,
        displayName,
        profilePic
    };

};


export default {addNewUser,  getUserByUsername};