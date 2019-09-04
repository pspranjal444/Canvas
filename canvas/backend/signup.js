var express = require('express');
var router = express.Router();
var md5 = require('md5');
const FacultyDet = require('./models/faculty_details');
const StudentDet = require('./models/student_details');
var kafka = require('./kafka/client');

router.post('/',function(req,res){
    kafka.make_request("signup", req, function(err, result){
        if(err){
            console.log(err);
        }
        else{                
            console.log(result);
            res.send(result);
        }
    });
});

module.exports = router;