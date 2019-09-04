var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var session = require('express-session');
var app = express();
var fileUpload = require('express-fileupload');
var fs = require('fs');
var md5 = require('md5');
var mongoose = require('mongoose');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;


var login = require('./login');
var signup = require('./signup');
var updateProfileS = require('./updateProfileS');
var getWLStudents = require('./getWLStudents');
var enroll = require('./enroll');
var getStudents = require('./getStudents');
var waitlist = require('./waitlist');
var submitGrades = require('./submitGrades');
var sendMessageF = require('./sendMessageF');
var submitAssignment = require('./submitAssignment');
var sendMessage = require('./sendMessage');
var imageUploadF = require('./imageUploadF');
var imageUploadS = require('./imageUploadS');
var getStudAns = require('./getStudAns');
var makeanncn = require('./makeanncn');
var getQuiz = require('./getQuiz');
var getMessages = require('./getMessages');
var getMessagesF = require('./getMessagesF');
var getCoSea = require('./getCoSea');
var getCorAns = require('./getCorAns');
var getFileLinksForS = require('./getFileLinksForS');
var getCodes = require('./getCodes');
var fileUploadRoute = require('./fileUpload');
var getanncn = require('./getanncn');
var getAssignments = require('./getAssignments');
var drop = require('./drop');
var getcoursesfd = require('./getcoursesfd');
var getcoursesReg = require('./getcoursesReg');
var getassn = require('./getassn');
var generateCode = require('./generateCode');
var addQuizQues = require('./addQuizQues');
var codeEnroll = require('./codeEnroll');
var createassn = require('./createassn');
var createcourse = require('./createcourse');
var getFileLinks = require('./getFileLinks');
var getcourses = require('./getcourses');
var submitQuiz = require('./submitQuiz');
var getProfileF = require('./getProfileF');
var updateProfileF = require('./updateProfileF');
var getProfileS = require('./getProfileS');
var getGrades = require('./getGrades');
var getSubAssn = require('./getSubAssn');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(fileUpload());
app.use('/', express.static(__dirname + '/uploads'));

var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
jwtOptions.secretOrKey = 'canvasSecret';

var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next){
        console.log('Payload Received', jwt_payload);
        if(jwt_payload){
            next(null, jwt_payload);
        }
        else{
            next(null, false);
        }
});
passport.use(strategy);
app.use(passport.initialize());


// app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use(session({
    secret: 'canvasSecret',
    resave: false,
    saveUninitialized: false,
    duration: 20 * 60 * 1000,
    activeDuration: 10 * 60 * 1000
}))


mongoose.connect('mongodb+srv://canvas:canvas@cluster0-gof0u.mongodb.net/test?retryWrites=true', {poolSize: 100});

app.use('/signin', login);
app.use('/signup', signup);
app.use('/updateProfileS', updateProfileS);
app.use('/getWLStudents', getWLStudents);
app.use('/enroll', enroll);
app.use('/getStudents', getStudents); 
app.use('/waitlist', waitlist);
app.use('/submitGrades', submitGrades);
app.use('/sendMessageF', sendMessageF);
app.use('/submitAssignment', submitAssignment);
app.use('/sendMessage', sendMessage);
app.use('/imageUploadF', imageUploadF);
app.use('/imageUploadS', imageUploadS);
app.use('/getStudAns', getStudAns);
app.use('/makeanncn', makeanncn);
app.use('/getQuiz', getQuiz);
app.use('/getMessages', getMessages);
app.use('/getMessagesF', getMessagesF);
app.use('/getCoSea', getCoSea);
app.use('/getCorAns', getCorAns);
app.use('/getFileLinksForS', getFileLinksForS);
app.use('/getCodes', getCodes);
app.use('/fileUpload', fileUploadRoute);
app.use('/getanncn', getanncn);
app.use('/getAssignments', getAssignments);
app.use('/drop', drop);
app.use('/getcoursesfd', getcoursesfd);
app.use('/getcoursesReg', getcoursesReg);
app.use('/getassn', getassn);
app.use('/generateCode', generateCode);
app.use('/addQuizQues', addQuizQues);
app.use('/codeEnroll', codeEnroll);
app.use('/createassn', createassn);
app.use('/createcourse', createcourse);
app.use('/getFileLinks', getFileLinks);
app.use('/getcourses', getcourses);
app.use('/submitQuiz', submitQuiz);
app.use('/getProfileF', getProfileF);
app.use('/updateProfileF', updateProfileF);
app.use('/getProfileS', getProfileS);
app.use('/getGrades', getGrades);
app.use('/getSubAssn', getSubAssn);
  


app.listen(3001);
console.log('Server running on port 3001');

module.exports = app;


