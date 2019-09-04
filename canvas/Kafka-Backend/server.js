var connection = require('./kafka/Connection');

var login = require('./services/login');
var signup = require('./services/signup');
var updateProfileS = require('./services/updateProfileS');
var getWLStudents = require('./services/getWLStudents');
var enroll = require('./services/enroll');
var getStudents = require('./services/getStudents');
var waitlist = require('./services/waitlist');
var submitGrades = require('./services/submitGrades');
var sendMessageF = require('./services/sendMessageF');
// var submitAssignment = require('./services/submitAssignment');
var sendMessage = require('./services/sendMessage');
// var imageUploadF = require('./services/imageUploadF');
// var imageUploadS = require('./services/imageUploadS');
var getStudAns = require('./services/getStudAns');
var makeanncn = require('./services/makeanncn');
var getQuiz = require('./services//getQuiz');
var getMessages = require('./services//getMessages');
var getMessagesF = require('./services/getMessagesF');
var getCoSea = require('./services/getCoSea');
var getCorAns = require('./services/getCorAns');
var getFileLinksForS = require('./services/getFileLinksForS');
var getCodes = require('./services/getCodes');
// var fileUploadRoute = require('./services/fileUpload');
var getanncn = require('./services/getanncn');
var getAssignments = require('./services//getAssignments');
var drop = require('./services/drop');
var getcoursesfd = require('./services/getcoursesfd');
var getcoursesReg = require('./services/getcoursesReg');
var getassn = require('./services/getassn');
var generateCode = require('./services/generateCode');
var addQuizQues = require('./services/addQuizQues');
var codeEnroll = require('./services/codeEnroll');
var createassn = require('./services/createassn');
var createcourse = require('./services/createcourse');
var getFileLinks = require('./services/getFileLinks');
var getcourses = require('./services/getcourses');
var submitQuiz = require('./services/submitQuiz');
var getProfileF = require('./services//getProfileF');
var updateProfileF = require('./services/updateProfileF');
var getProfileS = require('./services/getProfileS');
var getGrades = require('./services/getGrades');
var getSubAssn = require('./services/getSubAssn');


function handleTopicRequest(topic_name, function_name){

    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();

    console.log('server is running');
    consumer.on('message', function(message){
        console.log('message recieved for ' + topic_name + " " + function_name);
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);

        function_name.handle_request(data.data, function(err, res){
            console.log('After request handling: ', res);
            var payload = [{
                topic: data.replyTo,
                messages: JSON.stringify({
                    correlationId : data.correlationId,
                    data : res
                }),
                partition: 0
            }];

            producer.send(payload, function(err, data){
                console.log('Data: ', data);
            });
            return;

        });
    });
}


handleTopicRequest("login", login);
handleTopicRequest("signup", signup);
handleTopicRequest("updateProfileS", updateProfileS);
handleTopicRequest("getWLStudents", getWLStudents);
handleTopicRequest("enroll", enroll);
handleTopicRequest("getStudents", getStudents);
handleTopicRequest("submitGrades", submitGrades);
handleTopicRequest("waitlist", waitlist);
handleTopicRequest("sendMessageF", sendMessageF);
// handleTopicRequest("submitAssignment", submitAssignment);
handleTopicRequest("sendMessage", sendMessage);
// handleTopicRequest("imageUploadF", imageUploadF);
// handleTopicRequest("imageUploadS", imageUploadS);
handleTopicRequest("getStudAns", getStudAns);
handleTopicRequest("makeanncn", makeanncn);
handleTopicRequest("getQuiz", getQuiz);
handleTopicRequest("getMessages", getMessages);
handleTopicRequest("getMessagesF", getMessagesF);
handleTopicRequest("getCoSea", getCoSea);
handleTopicRequest("getCorAns", getCorAns);
handleTopicRequest("getFileLinksForS", getFileLinksForS);
handleTopicRequest("getCodes", getCodes);
handleTopicRequest("getanncn", getanncn);
handleTopicRequest("getAssignments", getAssignments);
handleTopicRequest("drop", drop);
handleTopicRequest("getcoursesfd", getcoursesfd);
handleTopicRequest("getcoursesReg", getcoursesReg);
handleTopicRequest("getassn", getassn);
handleTopicRequest("generateCode", generateCode);
handleTopicRequest("addQuizQues", addQuizQues);
handleTopicRequest("codeEnroll", codeEnroll);
handleTopicRequest("createassn", createassn);
handleTopicRequest("createcourse", createcourse);
handleTopicRequest("getFileLinks", getFileLinks);
handleTopicRequest("getcourses", getcourses);
handleTopicRequest("submitQuiz", submitQuiz);
handleTopicRequest("getProfileF", getProfileF);
handleTopicRequest("updateProfileF", updateProfileF);
handleTopicRequest("getProfileS", getProfileS);
handleTopicRequest("getGrades", getGrades);
handleTopicRequest("getSubAssn", getSubAssn);
