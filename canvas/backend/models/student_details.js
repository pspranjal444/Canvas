const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    email: String,
    password: String,
    phone: String,
    about: String,
    city: String,
    country: String,
    company: String,
    school: String,
    hometown: String,
    languages: String,
    gender: String,
    imglink: String
})

module.exports = mongoose.model('StudentDet', studentSchema);