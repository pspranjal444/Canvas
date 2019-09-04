const mongoose = require('mongoose');

const messages = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    message: String,
    emailSender: String,
    courseid: String
})

module.exports = mongoose.model('MessagesF', messages);