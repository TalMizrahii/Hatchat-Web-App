import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const messageSchema = new Schema({
    senderMessageCount: {
        type: Number,
        default: 1,
    },
    created: {
        type: Date,
        default: Date.now,
    },
    senderUser: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        select: 'username displayName profilePic',
        required: true
    },
    content: {
        type: String,
        required: true,
    },
});



const Message = mongoose.model('Message', messageSchema);

export default Message;
