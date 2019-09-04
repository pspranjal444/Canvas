const mongoose = require('mongoose');

const quiz = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: String,
    courseid: String,
    ques: String,
    op1: String,
    op2: String,
    op3: String,
    op4: String,
    corans: String
})

module.exports = mongoose.model('Quiz', quiz);