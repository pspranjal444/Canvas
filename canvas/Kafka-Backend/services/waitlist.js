const EDWCourses = require('../../backend/models/edw_courses');
const StudentDet = require('../../backend/models/student_details');
const Courses = require('../../backend/models/courses');
var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://canvas:canvas@cluster0-gof0u.mongodb.net/test?retryWrites=true');

function handle_request(message, callback){
    // console.log(req.body.email);
    // console.log(req.body.courseid);
    var email = message.body.email;
    var courseid = message.body.courseid;
    var name = '';
    var coursename = '';
    var query = {email: email};//from student_details
    var query1 = {courseid: courseid}; //from courses
    
    StudentDet.find(query).exec().then(result=>{
        name = result[0].name;
        console.log(result);
        syncOne();
    }).catch(err=>console.log(err));
    
    function syncOne(){
        // console.log('THIS IS ', name)
        Courses.find(query1).exec().then(result=>{
            console.log(result);
            coursename = result[0].coursename;
            syncTwo();
        }).catch(err=>console.log(err));
        
    }
    
    function syncTwo(){
        console.log('THIS IS', coursename);
        // var query2 = "INSERT INTO edw_courses (name, email, courseid, coursename, status) VALUES ('"+name+"', '"+email+"', '"+courseid+"', '"+coursename+"', 'W')";
        Courses.find({courseid: courseid}).exec().then(result=>{
            if(result.coursecapc != 0){
                syncFour();
            }

            else{
                Courses.find({courseid: courseid}).exec().then(result=>{
                    if(result.wlcapc != 0){
                        const data = new EDWCourses({
                            _id: new mongoose.Types.ObjectId(),
                            name: name,
                            email: email,
                            courseid: courseid,
                            coursename: coursename,
                            status: 'W'
                        })
                        
                        data.save().then(result=>{
                            console.log(result);
                            callback(null, true);
                        }).catch(err=>console.log(err));
                        
                    }
                    else{
                        syncFour();  
                    } 
                })
            }
        });
    }

    function syncFour(){
        callback(null, false);
    }
}

exports.handle_request = handle_request;