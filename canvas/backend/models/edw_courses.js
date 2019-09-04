const mongoose = require('mongoose');

const edwCourses = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    email: String,
    courseid: String,
    coursename: String,
    status: String
})

module.exports = mongoose.model('EDWCourses', edwCourses);