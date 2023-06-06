const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const users = new Schema({
    username: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    displayName: {
        type: String,
        require: true
    },
    profilePic: {
        type: String,
        require: false
    }
});

const Users = mongoose.model('Users', users);

module.exports = Users;