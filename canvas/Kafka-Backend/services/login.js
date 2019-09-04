var md5 = require('md5');
const FacultyDet = require('../../backend/models/faculty_details');
const StudentDet = require('../../backend/models/student_details');
var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://canvas:canvas@cluster0-gof0u.mongodb.net/test?retryWrites=true');


function handle_request(message, callback){
    // console.log(req.body.email);
    // console.log(req.body.password);
    // console.log(req.body.category);
    var flag = false;
    var x = '';
    var email = message.body.email;
    var password = message.body.password;
    console.log('HELLO');
    password = md5(password);
    console.log(password);
    // res.cookie('cookie', email, {maxAge: 900000, httpOnly: false, path: '/'})
    // req.session.email = email;
    console.log('INSIDE SIGNIN');
    if(message.body.category == 'Faculty'){
        console.log('HELLO');
        

        var query = {email: email, password: password};
        FacultyDet.find(query).exec().then(res=>{
            if(res.length>0){
                syncOne();
            }
            else{
                syncTwo();
            }
        }).catch(err => {
            console.log(err);
            syncTwo();
        })
        
    }
    
    else if(message.body.category == 'Student'){
        var query = {email: email, password: password};
        StudentDet.find(query).exec().then(res=>{
            if(res.length>0){
                syncOne();
            }
            else{
                syncTwo();
            }
        }).catch(err => {
            console.log(err);
            syncTwo();
        })
    }
    function syncOne(){
        callback(null, true);
    }

    function syncTwo(){
        callback(null, false);
    }
}


exports.handle_request = handle_request;