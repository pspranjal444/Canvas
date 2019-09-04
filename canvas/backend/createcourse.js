var express = require('express');
var router = express.Router();
const Courses = require('./models/courses');
var kafka = require('./kafka/client');
var passport = require('passport');
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    kafka.make_request("createcourse", req, function(err, result){
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
