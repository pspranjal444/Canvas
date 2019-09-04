var express = require('express');
var router = express.Router();
const AssignmentFiles = require('./models/assignmentfiles');
var kafka = require('./kafka/client');
var passport = require('passport');
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    
    // var query = "SELECT email, link, fileLocation, filename FROM assignmentfiles WHERE courseid='"+courseid+"' AND name='"+name+"'";
    kafka.make_request("getAssignments", req, function(err, result){
        if(err){
            console.log(err);
        }
        else{                
            console.log(result);
            res.json(result);
        }
    });
});

module.exports = router;