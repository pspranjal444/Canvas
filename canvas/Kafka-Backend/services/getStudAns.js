const QuizAnswers = require('../../backend/models/quizAnswers');

function handle_request(message, callback){
    const {email, courseid} = message.query;
    console.log(email, courseid);
    var query = {email: email, courseid: courseid};
    QuizAnswers.find(query).exec().then(result=>{
        console.log(result);
        callback(null, result);
    }).catch(err=>{console.log(err); callback(err, null);});
}


exports.handle_request = handle_request;