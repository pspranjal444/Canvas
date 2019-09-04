var express = require('express');
// var router = express.Router();
const Courses = require('../../backend/models/courses');
var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://canvas:canvas@cluster0-gof0u.mongodb.net/test?retryWrites=true');

function handle_request(message, callback){
    var {email} = message.body;
    var {courseid} = message.body;
    var {coursename} = message.body;  
    var {coursedept} = message.body; 
    var {coursedesc} = message.body;
    var {courseroom} = message.body;
    var {coursecapc} = message.body;
    var {wlcapc} = message.body; 
    var {courseterm} = message.body;

    Courses.find({courseid: courseid}).exec().then(result=>{
        if(result.length > 0){
            callback(null, false);
        }
        else{
            const entry = new Courses({
                _id: new mongoose.Types.ObjectId(),
                email: email,
                courseid: courseid,
                coursename: coursename,
                coursedept: coursedept,
                coursedesc: coursedesc,
                courseroom: courseroom,
                coursecapc: coursecapc,
                wlcapc: wlcapc,
                courseterm: courseterm
            })
            
            entry.save().then(result=>{
                console.log(result);
                callback(null, true);
            }).catch(err=>{console.log(err); callback(err, null);});
        }
    })
    
    
}

exports.handle_request = handle_request;
