var assert = require('chai').assert;
var app = require('../backend/canvas_server');

var chai = require('chai');
chai.use(require('chai-http'));
var expect = require('chai').expect;

var agent = require('chai').request.agent(app);

describe('Faculty Profile', function(){

    it('GET /getProfileF',function(){
        agent.get('/getProfileF').query({email: 'admin@gmail.com'})
            .then(function(res){
                expect(res.body[0].name).to.equal('ADMIN');
            });
    });
})

describe('Waitlisted Students', function(){

    it('GET /getWLStudents',function(){
        agent.get('/getWLStudents').query({courseid: 'CMPE202'})
            .then(function(res){
                expect(res.body[0].name).to.equal('STUD');
            });
    });
})

describe('Permission Code', function(){

    it('GET /getCodes',function(){
        agent.get('/getCodes').query({email: 'stud@gmail.com'})
            .then(function(res){
                expect(res.body[0].code).to.equal('1434');
            });
    });
})

describe('Assignment Submission', function(){

    it('GET /getSubAssn',function(){
        agent.get('/getSubAssn').query({email: 'stud@gmail.com', courseid: 'CMPE202'})
            .then(function(res){
                expect(res.body[0].name).to.equal('Lab #1');
            });
    });
})

describe('Get Grades', function(){

    it('GET /getGrades',function(){
        agent.get('/getGrades').query({email: 'stud@gmail.com', courseid: 'CMPE202'})
            .then(function(res){
                expect(res.body[0].grade).to.equal(10);
            });
    });
})

