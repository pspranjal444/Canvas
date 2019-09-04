var express = require('express');
var router = express.Router();
var kafka = require('./kafka/client');
var passport = require('passport');

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log(req.body.email);
    console.log(req.body.courseid);
    console.log(req.body.coursename);
    console.log(req.body.descp);
    console.log(req.body.name);
    kafka.make_request("createassn", req, function(err, result){
        if(err){
            console.log(err);
        }
        else{                
            console.log(result);
            res.send(true);
        }
    });
});

module.exports = router;