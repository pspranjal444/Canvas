const mongoose = require('mongoose');

const files = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: String,
    courseid: String,
    fileLocation: String,
    filename: String
})

module.exports = mongoose.model('Files', files);