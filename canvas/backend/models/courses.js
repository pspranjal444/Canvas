const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: String,
    courseid: String,
    coursename: String,
    coursedept: String,
    coursedesc: String,
    courseroom: String,
    coursecapc: Number,
    wlcapc: Number,
    courseterm: String
})

module.exports = mongoose.model('Courses', courseSchema);