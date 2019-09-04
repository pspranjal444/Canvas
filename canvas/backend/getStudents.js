var express = require('express');
var router = express.Router();
// const EDWCourses = require('./models/edw_courses');
var kafka = require('./kafka/client');
var passport = require('passport');
router.get('/', (req, res) => {
    // const {email} = req.query;
    kafka.make_request("getStudents", req, function(err, result){
        if(err){
            console.log(err);
        }
        else{                
            console.log(result);
            res.json(result);
        }
    });

});
// passport.authenticate('jwt', { session: false }), 
module.exports = router;