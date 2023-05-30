import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const users = new Schema({
    userName: {
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

const Users = mongoose.model('users', users);

module.exports = Users;