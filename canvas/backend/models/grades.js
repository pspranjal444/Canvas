const mongoose = require('mongoose');

const grades = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: String,
    courseid: String,
    name: String,
    grade: Number
})

module.exports = mongoose.model('Grades', grades);