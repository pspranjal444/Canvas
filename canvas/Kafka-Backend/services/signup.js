var md5 = require('md5');
const FacultyDet = require('../../backend/models/faculty_details');
const StudentDet = require('../../backend/models/student_details');
var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://canvas:canvas@cluster0-gof0u.mongodb.net/test?retryWrites=true');


function handle_request(message, callback){
    // console.log(req.body.name);
    // console.log(req.body.password);
    // console.log(req.body.category);
    // console.log(req.body.email);
    var name = message.body.name;
    var password = message.body.password;
    var email = message.body.email;
    password = md5(password);
    
    
    if(message.body.category == 'Faculty'){
        FacultyDet.find({email: email}).exec().then(result=>{
            if(result.length > 0){
                callback(null, false);
            }
            else{
                if(message.body.email && message.body.password){
                const entry = new FacultyDet({
                    _id: new mongoose.Types.ObjectId(),
                    name: message.body.name,
                    email: message.body.email,
                    password: md5(message.body.password),
                    phone: '',
                    about: '',
                    city: '',
                    country: '',
                    company: '',
                    school: '',
                    hometown: '',
                    languages: '',
                    gender: '',
                    imglink: ''
                })
                console.log('Entered');
                entry.save().then(result=>{
                    console.log(result);
                    callback(null, true)
                })
                .catch(err => {console.log(err); callback(err, null);});} 
            }   
        })
    }
    
            
    else if(message.body.category == 'Student'){
        StudentDet.find({email: email}).exec().then(result=>{
            if(result.length > 0){
                callback(null, false);
            }
            else{
                if(message.body.email && message.body.password){
                const entry = new StudentDet({
                    _id: new mongoose.Types.ObjectId(),
                    name: message.body.name,
                    email: message.body.email,
                    password: md5(message.body.password),
                    phone: '',
                    about: '',
                    city: '',
                    country: '',
                    company: '',
                    school: '',
                    hometown: '',
                    languages: '',
                    gender: '',
                    imglink: ''
                })
                console.log('Entered');
                entry.save().then(result=>{
                    console.log(result);
                    callback(null, true);
                })
                .catch(err => {console.log(err); callback(err, null);});}
                // res.send(true);
            }
        })  
    }      
}

exports.handle_request = handle_request;