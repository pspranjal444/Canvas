const mongoose = require('mongoose');

const assignmentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: String,
    courseid: String,
    coursename: String,
    name: String,
    descp: String
})

module.exports = mongoose.model('Assignments', assignmentSchema);