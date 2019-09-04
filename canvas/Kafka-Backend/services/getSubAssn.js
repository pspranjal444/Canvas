const AssignmentFiles = require('../../backend/models/assignmentfiles');
var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://canvas:canvas@cluster0-gof0u.mongodb.net/test?retryWrites=true');

function handle_request(message, callback){
    console.log('Email', message.query.email);
    
    var email = message.query.email;
    var courseid = message.query.courseid;
    var query = {email: email, courseid: courseid};
    console.log('EMAIL EMAIL EMAIL', email);
    AssignmentFiles.find(query).exec().then(result=>{
        console.log(result);
        callback(null, result);
    }).catch(err=>{console.log(err); callback(err, null);});
    
}

exports.handle_request = handle_request;