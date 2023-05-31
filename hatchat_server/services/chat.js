import Chat from "../models/chat.js";
import User from "../models/users.js";

const addNewChat = async (username) => {
    try {
        // Find the user by username and select specific fields
        const user = await User.findOne({ username }, 'username displayName profilePic');

        // User not found
        if (!user) {
            return false;
        }

        // Create a new chat with the found user
        const newChat = new Chat({
            users: [user]
        });

        // Save the new chat
        const savedChat = await newChat.save();

        if (savedChat) {
            // Construct the desired response object
            return {
                id: savedChat.id,
                user: {
                    username: user.username,
                    displayName: user.displayName,
                    profilePic: user.profilePic
                }
            };
        } else {
            return false;
        }
    } catch (error) {
        console.error(error);
        return false;
    }
};

export default { addNewChat };
