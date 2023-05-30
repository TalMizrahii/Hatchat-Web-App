import userService from "../services/users";

const addNewUser = async (req, res) => {
    res.json(await userService.addNewUser(req.body.userName, req.body.password, req.body.displayName, req.body.profilePic));
};

const getUserByUserName = async (req, res) => {
    const user = await userService.getUserByUserName(req.params.id);
    if (!user) {
        return res.status(401).json({errors: ['Invalid userName/password']});
    }
    res.json(user);
};

module.exports = {addNewUser, getUserByUserName}