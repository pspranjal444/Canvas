
const Files = require('../../backend/models/files');

function handle_request(message, callback) {
    const {email, courseid} = message.query;

    var query = {email: email, courseid: courseid}
    Files.find(query).exec().then(result=>{
        console.log(result);
        callback(null, result);
    }).catch(err=>{console.log(err); callback(err, null);});
}

exports.handle_request = handle_request;