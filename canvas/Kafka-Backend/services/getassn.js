const CreateAssignment = require('../../backend/models/crtassn');

function handle_request(message, callback){
    console.log('Email', message.query.email);
    
    var email = message.query.email;
    var courseid = message.query.courseid;
    var query = {courseid: courseid};
    CreateAssignment.find(query).exec().then(result=>{
        console.log(result);
        callback(null, result);
    }).catch(err=>{console.log(err); callback(err, null);});
    
}

exports.handle_request = handle_request;