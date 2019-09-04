import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import './App.css';
import Main from './components/Main';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Fac_dashboard from './components/Faculty/fac_dashboard';
import CreateCourse from './components/Faculty/CreateCourse';
import {BrowserRouter} from 'react-router-dom';
import ViewCourses from './components/Faculty/ViewCourses';
import Course from './components/Faculty/Course';
import CreateAssignment from './components/Faculty/CreateAssignment';
import MakeAnnouncement from './components/Faculty/MakeAnnouncement';
import './style.css';
import Stu_dashboard from './components/Student/stu_dashboard';
import Enroll from './components/Student/Enroll';
import CourseDesc from './components/Student/CourseDesc';
import Drop from './components/Student/Drop';
import ViewStudents from './components/Faculty/ViewStudents';
import CreateQuiz from './components/Faculty/CreateQuiz';
import CourseStud from './components/Student/CourseStud';
import QuizView from './components/Student/QuizView';
import ViewAnnouncement from './components/Student/ViewAnnouncement';
import ViewPeople from './components/Student/ViewPeople';
import ViewAssignment from './components/Student/Assignment';
import FileUpload from './components/Faculty/FileUpload';
import UpdateProfileF from './components/Faculty/UpdateProfileF';
import UpdateProfileS from './components/Student/UpdateProfileS';
import GradeAssign from './components/Faculty/GradeAssign';
import ViewGradeAssn from './components/Faculty/ViewGradeAssn';
import ViewGrades from './components/Student/ViewGrades';
import ViewFiles from './components/Student/ViewFiles';
import Inbox from './components/Student/Inbox';
import InboxF from './components/Faculty/Inbox';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
          <div className="App">
            <Route exact path='/' component={Signin}/>
            <Route path='/signup' component={Signup}/>
            <Route path='/facdash' component={Fac_dashboard}/>
            <Route path='/createcourse' component={CreateCourse}/>
            <Route path='/viewcourses'component={ViewCourses}/>
            <Route path='/course' component={Course}/>
            <Route path='/createassn' component={CreateAssignment}/>
            <Route path='/makeanncn' component={MakeAnnouncement}/>
            <Route path='/viewStudents' component={ViewStudents}/>
            <Route path='/createQuiz' component={CreateQuiz}/>
            <Route path='/updateProfileF' component={UpdateProfileF}/>
            <Route path='/gradessn' component={GradeAssign}/>
            <Route path='/viewgradeassn' component={ViewGradeAssn}/>
            <Route path='/viewGrades' component={ViewGrades}/>
            <Route path='/viewFilesforS' component={ViewFiles}/>
            <Route path='/inboxF' component={InboxF}/>
            {/* Students */}
            <Route path='/studash' component={Stu_dashboard}/>
            <Route path='/enroll' component={Enroll}/>
            <Route path='/courseDesc' component={CourseDesc}/>
            <Route path='/dropp' component={Drop}/>
            <Route path='/courseStud' component={CourseStud}/>
            <Route path='/viewQuiz' component={QuizView}/>
            <Route path='/viewAnncn' component={ViewAnnouncement}/>
            <Route path='/viewPeople' component={ViewPeople}/>
            <Route path='/viewAssignment' component={ViewAssignment}/>
            <Route path='/fileUpload' component={FileUpload}/>
            <Route path='/updateProfileS' component={UpdateProfileS}/>
            <Route path='/inboxS' component={Inbox}/>
          </div>
      </BrowserRouter>
    );
  }
}

export default App;
