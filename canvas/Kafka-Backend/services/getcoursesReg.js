const EDWCourses = require('../../backend/models/edw_courses');

function handle_request(message, callback){
    console.log('Email', message.query.email);
    var email = message.query.email;
    var query = {email: email, status: 'E'};
    EDWCourses.find(query).exec().then(result=>{
        console.log(result);
        callback(null, result);
    }).catch(err=>{console.log(err); callback(err, null);});
    
}

exports.handle_request = handle_request;