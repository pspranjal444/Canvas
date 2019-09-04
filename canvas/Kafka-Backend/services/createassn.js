var express = require('express');
// var router = express.Router();
const CreateAssignment = require('../../backend/models/crtassn');
var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://canvas:canvas@cluster0-gof0u.mongodb.net/test?retryWrites=true');

function handle_request(message, callback) {
    
    var email = message.body.email;
    var courseid = message.body.courseid;
    var coursename = message.body.coursename;
    var descp = message.body.descp;
    var name = message.body.name;
  
    const data = new CreateAssignment({
        _id: new mongoose.Types.ObjectId(),
        email: email,
        courseid: courseid,
        coursename: coursename,
        name: name,
        descp: descp
    });
    
    data.save().then(result=>{
        console.log(result);
        callback(null, true);
    }).catch(err=>{console.log(err); callback(err, null);});
}

exports.handle_request = handle_request;