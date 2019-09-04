
const Courses = require('../../backend/models/courses');

function handle_request(message, callback){
    console.log('Email', message.query.email);
    var email = message.query.email;
    
    var query = {email: email};
    Courses.find(query).exec().then(result=>{
        console.log(result);
        callback(null, result);
    }).catch(err=>{console.log(err); callback(err, null);});
}

exports.handle_request = handle_request;