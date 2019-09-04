const mongoose = require('mongoose');

const quizAnswers = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: String,
    courseid: String,
    ques: String,
    ans: String
})

module.exports = mongoose.model('QuizAnswers', quizAnswers);