const Quiz = require('../../backend/models/quiz');
var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://canvas:canvas@cluster0-gof0u.mongodb.net/test?retryWrites=true');


function handle_request(message, callback){
    const email = message.body.email;
    const courseid = message.body.courseid;
    const ques = message.body.ques;
    const op1 = message.body.op1;
    const op2 = message.body.op2;
    const op3 = message.body.op3;
    const op4 = message.body.op4;
    const ca = message.body.ca;

    const data = new Quiz({
        _id: new mongoose.Types.ObjectId(),
        email: email,
        courseid: courseid,
        ques: ques,
        op1: op1,
        op2: op2,
        op3: op3,
        op4: op4,
        corans: ca
    })
    
    data.save().then(result=>{
        console.log(result);
        callback(null, result);
    }).catch(err=>{console.log(err); callback(err, null);});
}

exports.handle_request = handle_request;