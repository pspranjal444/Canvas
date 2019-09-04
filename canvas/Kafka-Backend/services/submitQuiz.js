const QuizAnswers = require('../../backend/models/quizAnswers');
var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://canvas:canvas@cluster0-gof0u.mongodb.net/test?retryWrites=true');

function handle_request(message, callback){
    const {email, courseid, ques, option} = message.body;
    console.log('Email', email);
    console.log('Courseid', courseid);
    console.log('Question', ques);
    console.log('Option', option);
    // var query = "INSERT INTO quiz_answers (email, courseid, ques, ans) VALUES ('"+email+"', '"+courseid+"', '"+ques+"', '"+option+"')";
    const data = new QuizAnswers({
        _id: new mongoose.Types.ObjectId(),
        email: email,
        courseid: courseid,
        ques: ques,
        ans: option
    })
    
    data.save().then(result=>{
        console.log(result);
        callback(null, true);
    }).catch(err=>{console.log(err); callback(err, null);});
}

exports.handle_request = handle_request;