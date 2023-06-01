import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const chatSchema = new Schema({
    id: {
        type: Number,
        unique: true,
        required: true,
    },
    users: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    messages: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Message',
        },
    ],
});






const Chat = mongoose.model('Chat', chatSchema);

export default Chat;
