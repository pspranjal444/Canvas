const Grades = require('../../backend/models/grades');
var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://canvas:canvas@cluster0-gof0u.mongodb.net/test?retryWrites=true');

function handle_request(message, callback){
    const {email, courseid, name, grade} = message.body;
    // var query = "INSERT INTO grades (email, courseid, name, grade) VALUES ('"+email+"', '"+courseid+"', '"+name+"', '"+grade+"')";
    const data = new Grades({
        _id: new mongoose.Types.ObjectId(),
        email: email,
        courseid: courseid,
        name: name,
        grade: grade
    })

    data.save().then(result=>{
        console.log(result);
        callback(null, true);
    }).catch(err=>{console.log(err); callback(err, null);}); 
}

exports.handle_request = handle_request;
