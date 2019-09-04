var express = require('express');
var router = express.Router();
const StudentDet = require('./models/student_details');
var kafka = require('./kafka/client');
var passport = require('passport');
router.get('/', (req, res) => {
    kafka.make_request("getProfileS", req, function(err, result){
        if(err){
            console.log(err);
        }
        else{                
            console.log(result);
            res.json(result);
        }
    });
})

module.exports = router;