var express = require('express');
var router = express.Router();
const Announcements = require('./models/anncn');
var kafka = require('./kafka/client');
var passport = require('passport');
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    kafka.make_request("makeanncn", req, function(err, result){
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
