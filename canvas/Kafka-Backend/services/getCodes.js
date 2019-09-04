const Codes = require('../../backend/models/codes');

function handle_request(message, callback){
    const {email} = message.query;
    // console.log('EMAIL CODE',email);
    var query = {email: email};
    Codes.find(query).exec().then(result=>{
        console.log(result);
        callback(null, result);
    }).catch(err=>{console.log(err); callback(err, null);});
}

exports.handle_request = handle_request;