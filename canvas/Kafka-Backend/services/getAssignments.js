const AssignmentFiles = require('../../backend/models/assignmentfiles');

function handle_request(message, callback){
    const {courseid, name} = message.query;
    // var query = "SELECT email, link, fileLocation, filename FROM assignmentfiles WHERE courseid='"+courseid+"' AND name='"+name+"'";
    var query = {courseid: courseid, name: name};
    AssignmentFiles.find(query).then(result=>{
        console.log(result);
        callback(null, result);
    }).catch(err=>{console.log(err); callback(err, null);});
}

exports.handle_request = handle_request;