var express = require('express');
var router = express.Router();
var kafka = require('./kafka/client');
var passport = require('passport');

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    kafka.make_request("codeEnroll", req, function(err, result){
        if(err){
            console.log(err);
        }
        else{                
            console.log(result);
        }
    });
})

module.exports = router;