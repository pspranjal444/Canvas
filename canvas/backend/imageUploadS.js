var express = require('express');
var router = express.Router()
const StudentDet = require('./models/student_details');
var passport = require('passport');
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    let file = req.files.file;
    var filename = req.files.file.name;

    var randomString = "";
    var group = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++){
        randomString += group.charAt(Math.floor(Math.random() * group.length));
    }

    console.log(randomString);
        
    file.mv(
        __dirname + '/uploads/'+randomString+`${filename}`,
        function (err) {
          if (err) throw err;
          console.log('Done');
    })
    // file.mv('./uploads/'+filename, function(err){
    fileLoc = 'http://localhost:3001/'+randomString+`${filename}`;
        // })
    // console.log(req.body);
    const {email} = req.body;
    const {courseid} = req.body;

    // console.log(email);
    // console.log(courseid);

    var query = {$set: {imglink: fileLoc}};

    StudentDet.update({email: email}, query).exec().then(result=>{
        console.log(result);
        res.send(true);
    }).catch(err=>console.log(err));
    // console.log(filename);

    // console.log(req.files.file);
})

module.exports = router;
