import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const register = new Schema({
    userName: {
        type: String,
        require: true,
        unique: true // Adding the unique constraint
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
        //Miz need to give me his default img (Yuval plz note to convert it to base64)
        require: true
    }
    });

const Register = mongoose.model('register', register);

module.exports = Register;