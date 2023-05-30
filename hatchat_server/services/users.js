import Register from '../models/users.js';
import defaultProfilePic from '../defaultProfilePic.js';

const isValidBase64 = (value) => {
    try {
        Buffer.from(value, 'base64');
        return true;
    } catch (error) {
        return false;
    }
};

const addUser = async (userName, password, displayName, profilePic) => {
    if (profilePic && !isValidBase64(profilePic)) {
        throw new Error('Invalid base64 string for profilePic');
    }

    const newUser = new Register({
        userName: userName,
        password: password,
        displayName: displayName,
        profilePic: profilePic || defaultProfilePic,
    });

    try {
        await newUser.save();
        // Handle successful save
    } catch (error) {
        // Handle the error
        console.error(error);
        // You can add additional error handling logic here
    }
};

export { addUser };
