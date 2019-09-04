var express = require('express');
var router = express.Router();
const Messages = require('./models/messages');
var kafka = require('./kafka/client');

router.get('/', (req, res) => {
    kafka.make_request("getMessages", req, function(err, result){
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