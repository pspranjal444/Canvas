
const Codes = require('../../backend/models/codes');
var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://canvas:canvas@cluster0-gof0u.mongodb.net/test?retryWrites=true');

function handle_request(message, callback) {
    const {email} = message.body;
    const {courseid} = message.body;
    console.log('Email ', email);
    console.log('CourseID', courseid);

    var code = parseInt(Math.random() * (9999 - 1000) + 1000);
    
    // var query = "INSERT INTO codes (email, courseid, code) VALUES ('"+email+"', '"+courseid+"', '"+code+"')";

    const data = new Codes({
        _id: new mongoose.Types.ObjectId(),
        email: email,
        courseid: courseid,
        code: code
    })
    data.save().then(result=>{
        console.log(result);
        callback(null, true);
    }).catch(err=>{console.log(err); callback(err, null);});
}

exports.handle_request = handle_request;