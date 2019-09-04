const EDWCourses = require('../../backend/models/edw_courses');
var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://canvas:canvas@cluster0-gof0u.mongodb.net/test?retryWrites=true', {poolSize: 100});

function handle_request(message, callback){
    // const {email} = req.query;
    const {courseid} = message.query;
    let limit = Number(message.query.limit);
    let skip = limit*Number(message.query.t);
    // var query = "SELECT name, email, status FROM edw_courses WHERE courseid = '"+courseid+"' AND status='E'";
    var query = {courseid: courseid, status: 'E'};
    EDWCourses.find(query).limit(limit).skip(skip).exec().then(result=>{
        console.log(result);
        callback(null, result);
    }).catch(err=>{console.log(err); callback(err, null);});

}

exports.handle_request = handle_request;