const Messages = require('../../backend/models/messages');
var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://canvas:canvas@cluster0-gof0u.mongodb.net/test?retryWrites=true');
function handle_request(msg, callback){
    const {emailReceiver, emailSender, message} = msg.body;
    const data = new Messages({
        _id: new mongoose.Types.ObjectId(),
        message: message,
        emailSender: emailSender,
        emailReceiver: emailReceiver
    })
    data.save().then(result=>{
        console.log(result);
        callback(null, true);
    }).catch(err=>{console.log(err); callback(err, null);});
}

exports.handle_request = handle_request;