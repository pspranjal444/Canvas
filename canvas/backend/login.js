var express = require('express');
var router = express.Router();
var kafka = require('./kafka/client');
var md5 = require('md5');
const FacultyDet = require('./models/faculty_details');
const StudentDet = require('./models/student_details');
var kafka = require('./kafka/client');
var jwt = require('jsonwebtoken');

router.post('/',(req, res) => {
    // console.log(req.body.email);
    // console.log(req.body.password);
    // console.log(req.body.category);
    console.log('INSIDE SIGNIN');
    kafka.make_request('login', req, function(err, result){
        if(err){
            console.log(err);
        }
        else{  
            var payload = {email: req.body.email, password: req.body.password};
            var token = jwt.sign(payload, 'canvasSecret');              
            console.log('LOGIN', result);
            console.log('HELLO SIGNIN');
            // res.send(result);
            res.json({result: result, token: 'JWT '+token});
        }
    });
});


module.exports = router;