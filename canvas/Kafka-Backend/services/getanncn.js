
const Announcements = require('../../backend/models/anncn');


function handle_request(message, callback){
    console.log('Email', message.query.email);
    
    var email = message.query.email;
    var courseid = message.query.courseid;
    var query = {courseid: courseid};
    Announcements.find(query).exec().then(result=>{
        console.log(result);
        callback(null, result);
    }).catch(err=>console.log(err));
}

exports.handle_request = handle_request;