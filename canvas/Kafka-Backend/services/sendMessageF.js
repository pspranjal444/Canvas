const MessagesF = require('../../backend/models/messagesF');
var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://canvas:canvas@cluster0-gof0u.mongodb.net/test?retryWrites=true');
function handle_request(msg, callback){
    const {courseid, emailSender, message} = msg.body;
    const data = new MessagesF({
        _id: new mongoose.Types.ObjectId(),
        message: message,
        emailSender: emailSender,
        courseid: courseid
    })
    data.save().then(result=>{
        console.log(result);
        callback(null, true);
    }).catch(err=>{console.log(err); callback(err, null);});
}

exports.handle_request = handle_request;