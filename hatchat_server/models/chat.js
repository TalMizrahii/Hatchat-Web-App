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
            select: 'username displayName profilePic',
        },
    ],
    messages: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Message',
        },
    ],
});

chatSchema.pre('save', function (next) {
    if (!this.isNew) {
        // Only generate a new ID for new chats
        return next();
    }

    this.constructor.findOne({}, {}, { sort: { id: -1 } }, (err, lastChat) => {
        if (err) {
            return next(err);
        }

        this.id = lastChat ? lastChat.id + 1 : 1;

        next();
    });
});




const Chat = mongoose.model('Chat', chatSchema);

export default Chat;
