const MessagesF = require('../../backend/models/messagesF');

function handle_request(message, callback){
    const {courseid} = message.query;
    var query = {courseid: courseid};

    MessagesF.find(query).exec().then(result=>{
        console.log(result);
        callback(null, result);
    }).catch(err=>{console.log(err); callback(err, null);});
}

exports.handle_request = handle_request;