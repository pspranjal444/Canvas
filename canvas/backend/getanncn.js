var express = require('express');
var router = express.Router();
const Announcements = require('./models/anncn');
var kafka = require('./kafka/client');
var passport = require('passport');

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log('Email', req.query.email);
    
    kafka.make_request("getanncn", req, function(err, result){
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