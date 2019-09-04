// var express = require('express');
// var router = express.Router();
const EDWCourses = require('../../backend/models/edw_courses');
const Courses = require('../../backend/models/courses');

function handle_request(message, callback) {
    var email = message.body.email;
    var courseid = message.body.courseid;
    console.log(email);
    console.log(courseid);
    // var query = "DELETE FROM edw_courses WHERE email = '"+email+"' AND courseid = '"+courseid+"' AND status = 'E'";
    var query = {email: email, courseid: courseid, status: 'E'};
    EDWCourses.remove(query).exec().then(result=>{
        console.log(result);
        syncThree();
    }).catch(err=>{console.log(err); callback(err, null);});
    

    function syncThree(){
        // var query3 = "UPDATE courses SET coursecapc = coursecapc + 1 WHERE courseid = '"+courseid+"'";
        var query3 = {$inc: {coursecapc: 1}}
        Courses.update({courseid: courseid}, query3).exec().then(result=>{
            console.log(result);
        }).catch(err=>{console.log(err); callback(err, null);});
    }
    callback(null, true);
}

exports.handle_request = handle_request;