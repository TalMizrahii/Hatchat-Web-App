import Register from '../models/register';

const addUser = async (userName, password, displayName, profilePic) => {
    const newUser = new Register({
        userName: userName,
        password: password,
        displayName: displayName,
        profilePic: profilePic
    });
    if (profilePic){
        newUser.profilePic = profilePic;
    }
    try {
        await newUser.save();
        // Handle successful save
    } catch (error) {
        // Handle the error
        console.error(error);
    }

};