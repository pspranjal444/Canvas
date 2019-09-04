const mongoose = require('mongoose');

const assignmentFiles = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: String,
    courseid: String,
    name: String,
    link: String,
    fileLocation: String,
    filename: String
});

module.exports = mongoose.model('AssignmentFiles', assignmentFiles);