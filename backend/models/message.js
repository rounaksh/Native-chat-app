const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    recepientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    messageType: {
        type: String,
        enum: ['text', 'image'],
    },
    message: String,
    imageUrl: String,
    timeStamp: {
        type: Date,
        default: Date.now
    }
})

const message = mongoose.model('message', messageSchema)

module.exports = message