var express = require('express');
// var router = express.Router();
const EDWCourses = require('../../backend/models/edw_courses');
const Codes = require('../../backend/models/codes');
const Courses = require('../../backend/models/courses');
const StudentDet = require('../../backend/models/student_details');
var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://canvas:canvas@cluster0-gof0u.mongodb.net/test?retryWrites=true');


function handle_request(message, callback) {
    const {email, code} = message.body;
    var name = '';
    var courseid = '';
    var coursename = '';
    var query = {email: email}; //from student_details
    var query1 = {code: code};//from codes
    
    

    StudentDet.find(query).exec().then(result=>{
        console.log(result);
        name = result[0].name;
        syncOne();
    }).catch(err=>{console.log(err); callback(err, null);});

    function syncOne(){
        Codes.find(query1).exec().then(result=>{
            courseid = result[0].courseid;
            courseid.toString();
            syncTwo();
        }).catch(err=>{console.log(err); callback(err, null);});
    }

    function syncTwo(){
        // var query2 = "SELECT coursename FROM courses WHERE courseid = '"+courseid+"'";
        var query2 = {courseid: courseid}; //from courses
        Courses.find(query2).exec().then(result=>{
            console.log(result);
            coursename = result[0].coursename;
            console.log('COURSE NAME ', coursename);
            // console.log(name);
            syncThree();
        }).catch(err=>{console.log(err); callback(err, null);});
    }

    function syncThree(){
        // var query3 = "INSERT INTO edw_courses (name, email, courseid, coursename, status) VALUES ('"+name+"', '"+email+"', '"+courseid+"', '"+coursename+"', 'E')";

        const data = new EDWCourses({
            _id: new mongoose.Types.ObjectId(),
            name: name,
            email: email,
            courseid: courseid,
            coursename: coursename,
            status: 'E'
        })

        data.save().then(result=>{
            console.log(result);
            callback(null, true);
            syncFour();
        }).catch(err=>{console.log(err); callback(err, null);});
        
       
    }

    function syncFour(){
        // var query4 = "DELETE FROM codes where code='"+code+"' AND email='"+email+"' AND courseid='"+courseid+"'";
        var query4 = {code: code, email: email, courseid: courseid};
        Codes.remove(query4).exec().then(result=>{
            console.log(result);
        })
    }
}

exports.handle_request = handle_request;