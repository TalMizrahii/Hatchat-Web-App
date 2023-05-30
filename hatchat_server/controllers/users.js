import {userService} from "../services/users";

const addNewUser = async (req, res) => {
    res.json(await userService.addNewUser(req.body.userName, req.body.password, req.body.displayName, req.body.profilePic));
};

module.exports = {addNewUser}