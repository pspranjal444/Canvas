var express = require('express');
var router = express.Router();
const Quiz = require('./models/quiz');
var kafka = require('./kafka/client');
var passport = require('passport');
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    kafka.make_request("getQuiz", req, function(err, result){
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