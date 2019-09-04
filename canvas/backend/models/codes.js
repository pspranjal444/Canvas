const mongoose = require('mongoose');


const codesSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: String, 
    courseid: String,
    code: Number
})

module.exports = mongoose.model('Codes', codesSchema);