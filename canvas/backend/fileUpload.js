var express = require('express');
var router = express.Router();
const Files = require('./models/files');
// var fileUpload = require('express-fileupload');
// router.use(fileUpload());
var mongoose = require('mongoose');
var passport = require('passport');
mongoose.connect('mongodb+srv://canvas:canvas@cluster0-gof0u.mongodb.net/test?retryWrites=true');

router.post('/', (req, res) => {
    let file = req.files.file;
    var filename = req.files.file.name;

    var randomString = "";
    var group = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++){
        randomString += group.charAt(Math.floor(Math.random() * group.length));
    }

    console.log(randomString);
        
    file.mv(
        __dirname + '/uploads/' + randomString + `${filename}`,
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

    const data = new Files({
        _id: new mongoose.Types.ObjectId(),
        email: email,
        courseid: courseid,
        fileLocation: fileLoc,
        filename: filename
    })

    data.save().then(result=>{
        console.log(result);
        res.send(true);
    }).catch(err=>console.log(err));
    // console.log(filename);

    // console.log(req.files.file);
})

module.exports = router;