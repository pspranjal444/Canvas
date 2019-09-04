const mongoose = require('mongoose');

const announcementSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: String,
    courseid: String,
    name: String,
    descp: String
})

module.exports = mongoose.model('Announcements', announcementSchema);