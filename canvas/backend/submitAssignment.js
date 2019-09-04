var express = require('express');
var router = express.Router();
const AssignmentFiles = require('./models/assignmentfiles');
var mongoose = require('mongoose');
var passport = require('passport');
// var kafka = require('./kafka/client');
mongoose.connect('mongodb+srv://canvas:canvas@cluster0-gof0u.mongodb.net/test?retryWrites=true');


router.post('/', (req, res) => {
    let file = req.files.file;
    var filename = req.files.file.name;
    const {name, email, courseid, link} = req.body;
    var randomString = "";
    console.log(file);
    console.log(name);
    console.log(email);
    console.log(courseid);
    console.log(link);
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
    var fileLoc = 'http://localhost:3001/'+randomString+`${filename}`;
        // })
    // console.log(req.body);
    

    console.log(fileLoc);

    // var query = "INSERT INTO assignmentfiles (email, courseid, name, link, fileLocation, filename) VALUES ('"+email+"', '"+courseid+"', '"+name+"', '"+link+"', '"+fileLoc+"', '"+filename+"')";

    const data = new AssignmentFiles({
        _id: new mongoose.Types.ObjectId(),
        email: email,
        courseid: courseid,
        name: name,
        link: link,
        fileLocation: fileLoc,
        filename: filename
    })
    data.save().then(result=>{
        console.log(result);
        res.send(true);
    })
});

module.exports = router;
