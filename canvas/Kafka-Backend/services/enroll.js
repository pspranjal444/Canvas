
const StudentDet = require('../../backend/models/student_details');
const Courses = require('../../backend/models/courses');
const EDWCourses = require('../../backend/models/edw_courses');
var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://canvas:canvas@cluster0-gof0u.mongodb.net/test?retryWrites=true');

function handle_request(message, callback){
    // console.log(req.body.email);
    // console.log(req.body.courseid);
    var email = message.body.email;
    var courseid = message.body.courseid;
    var name = '';
    var coursename = '';
    var query = {email: email};//for name
    var query1 = {courseid: courseid};//for coursename
    
    StudentDet.find(query).exec().then(result=>{
        console.log(result);
        console.log('NAME', result[0].name);
        name = result[0].name;
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
        // console.log('THIS IS', coursename);
        // var query2 = "INSERT INTO edw_courses (name, email, courseid, coursename, status) VALUES ('"+name+"', '"+email+"', '"+courseid+"', '"+coursename+"', 'E')";
        // connection.query(query2, (err, result) => {
        //     if(err) throw err;
        //     console.log(result);
        //     syncThree();
        // });
        EDWCourses.find({email: email, courseid: courseid}).exec().then(result=>{
            if(result.length>0){
                syncFour();
            }
            else{
                const data = new EDWCourses({
                    _id: new mongoose.Types.ObjectId(),
                    name: name,
                    email: email,
                    courseid: courseid,
                    coursename: coursename,
                    status: 'E'
                });
                
                data.save().then(result=>{
                    console.log(result);
                    syncThree();
                }).catch(err=>console.log(err));
            }
        })
        
        

    }

    function syncThree(){
        // var query3 = "UPDATE courses SET coursecapc = coursecapc - 1 WHERE courseid = '"+courseid+"'";
        // connection.query(query3, (err, result) => {
        //     if(err) throw err;
        //     console.log(result);
        // });

        var query3 = {$inc: {coursecapc: -1}};
        Courses.update({courseid: courseid}, query3).exec().then(result=>{
            console.log(result);
            callback(null, true);
        }).catch(err=>console.log(err));
    }

    function syncFour(){
        callback(null, false);
    }
}

exports.handle_request = handle_request;