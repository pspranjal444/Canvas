var express = require('express');
var router = express.Router();
const EDWCourses = require('../../backend/models/edw_courses');

function handle_request(message, callback){
    const {courseid} = message.query;

    // var query = "SELECT name, email, status FROM edw_courses WHERE courseid = '"+courseid+"' AND status='W'";

    var query = {courseid: courseid, status: 'W'};
    EDWCourses.find(query).exec().then(result=>{
        console.log(result);
        callback(null, result);
    }).catch(err=>{console.log(err); callback(err, null);});
}

exports.handle_request = handle_request;