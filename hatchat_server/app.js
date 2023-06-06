const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require("mongoose");
const users = require('./routes/users');
const authenticator = require('./routes/authenticator');
const chat = require('./routes/chat');
const customEnv = require('custom-env');

const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server, {
    cors: {
        origin: "http://localhost:20233",
        methods: ["GET", "POST"]
    }
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/api/Users', users);
app.use('/api/Tokens', authenticator);
app.use('/api/Chats', chat);

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

const sockets = {};

io.on('connection', (socket) => {
    socket.on('join', (username) => {
        sockets[username] = socket;
        console.log(sockets);
        console.log(username);
    });
});

const port = process.env.PORT || 5000;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
