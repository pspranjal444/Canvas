var express = require('express');
var router = express.Router();
var kafka = require('./kafka/client');
var passport = require('passport');
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    kafka.make_request("addQuizQues", req, function(err, result){
        if(err){
            console.log("Error in adding question.", err);
        }
        else{                
            console.log("Property details saved successfully.", result);
        }
    });
})

module.exports = router;