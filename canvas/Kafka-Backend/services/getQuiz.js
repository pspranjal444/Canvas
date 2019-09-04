const Quiz = require('../../backend/models/quiz');

function handle_request(message, callback){
    const {courseid} = message.query;
    console.log('COURSE ID', courseid);
    var query = {courseid: courseid};

    Quiz.find(query).exec().then(result=>{
        console.log(result);
        callback(null, result);
    }).catch(err=>{console.log(err); callback(err, null);});
}


exports.handle_request = handle_request;