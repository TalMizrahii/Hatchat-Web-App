import express from 'express';
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from "mongoose";
import users from './routes/users.js'
import authenticator from './routes/authenticator.js'
import customEnv from 'custom-env';


customEnv.env(process.env.NODE_ENV, './config');
console.log(process.env.CONNECTION_STRING);
console.log(process.env.PORT);


const connectOptions = {
    useUnifiedTopology: true,
    useNewUrlParser: true
};

mongoose.connect(process.env.CONNECTION_STRING, connectOptions)
    .then(() => {
        console.log('Database connected successfully.');
    })
    .catch((error) => {
        console.error('Error connecting to the database:', error);
    });


const app = express();

app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use('/api/Users',users);
app.use('/api/Tokens' || '/api/Chats',authenticator);

app.listen(process.env.PORT);