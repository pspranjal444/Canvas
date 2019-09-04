var express = require('express');
var router = express.Router();
const FacultyDet = require('./models/faculty_details');
var kafka = require('./kafka/client');
var passport = require('passport');
router.get('/', (req, res) => {
    kafka.make_request("getProfileF", req, function(err, result){
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