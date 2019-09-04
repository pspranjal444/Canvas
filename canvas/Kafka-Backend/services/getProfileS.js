const StudentDet = require('../../backend/models/student_details');

function handle_request(message, callback){
    const {email} = message.query;
    
    var query = {email: email}
    
    StudentDet.find(query).exec().then(result=>{
        callback(null, result);
    })
    .catch(err=>{console.log(err); callback(err, null);});
}

exports.handle_request = handle_request;