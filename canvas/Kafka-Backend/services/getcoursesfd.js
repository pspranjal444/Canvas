
const Courses = require('../../backend/models/courses');

function handle_request(message, callback){
    Courses.find().exec().then(result=>{
        console.log(result);
        callback(null, result);
    }).catch(err=>{console.log(err); callback(err, null);});
}

exports.handle_request = handle_request;