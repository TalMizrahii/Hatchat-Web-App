const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require("mongoose");
const users = require('./routes/users');
const authenticator = require('./routes/authenticator');
const chat = require('./routes/chat');
const customEnv = require ('custom-env');

const app = express();
const http = require('http');
app.use(express.json());

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



app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
const site = express.static('public');

app.use('/', site);
app.use('/chat', site);
app.use('/register', site);


app.use('/api/Users', users);
app.use('/api/Tokens', authenticator);
app.use('/api/Chats', chat);

const server = http.createServer(app);
const {Server} = require('socket.io');
server.listen(20234);
const io = new Server(server);

const sockets = {};
io.on('connection', (socket) => {
    socket.on('join', (username) => {
        sockets[username] = socket;
        console.log(sockets);
        console.log(username);
    });
});

app.listen(process.env.PORT);
