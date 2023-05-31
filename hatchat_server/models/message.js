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

messageSchema.pre('save', async function (next) {
    if (!this.isNew) {
        // Only update the count for new messages
        return next();
    }

    try {
        // Find the highest message count for the senderUser
        const highestMessageCount = await this.constructor.findOne({
            senderUser: this.get('senderUser')
        }).sort('-senderMessageCount').exec();

        if (highestMessageCount) {
            this.senderMessageCount = highestMessageCount.senderMessageCount + 1;
        }

        next();
    } catch (error) {
        next(error);
    }
});

const Message = mongoose.model('Message', messageSchema);

export default Message;
