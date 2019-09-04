import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';


class CourseStud extends Component{
    constructor(props){
        super(props);

        this.state={
            coursename: cookie.load('coursename'),
            courseid: cookie.load('courseid'),
            email: cookie.load('email')
        }
    }

    render(){
        let redirectVar = null;
        if(!(cookie.load('email'))){
            redirectVar = <Redirect to='/'/>
        }
        
        return(
            <div style={{float: 'left'}}>
            {redirectVar}
                <h2 style={{height: 'auto', width: '195px'}}>{this.state.coursename} - {this.state.courseid}</h2>
                <button style={{backgroundColor: 'red', width: '187px'}}><Link className="courseDashR" to={{pathname: "/courseDesc",
                                   state: {coursename: this.state.coursename,
                                           courseid: this.state.courseid,
                                           email: this.state.email } }}>BACK</Link></button><br/>
                <button className="courseDashButton"><Link className="courseDash" to={{pathname: "/viewGrades",
                                   state: {coursename: this.state.coursename,
                                           courseid: this.state.courseid,
                                           email: this.state.email } }}>View Grades</Link></button><br/>
                <button className="courseDashButton"><Link className="courseDash" to={{pathname: "/viewAssignment",
                                   state: {coursename: this.state.coursename,
                                           courseid: this.state.courseid,
                                           email: this.state.email } }}>Assignment</Link></button><br/>
                <button className="courseDashButton"><Link className="courseDash" to={{pathname: "/viewQuiz",
                                   state: {coursename: this.state.coursename,
                                           courseid: this.state.courseid,
                                           email: this.state.email } }}>Quiz</Link></button><br/>
                <button className="courseDashButton"><Link className="courseDash" to='/viewAnncn'>Announcements</Link></button><br/>
                <button className="courseDashButton"><Link className="courseDash" to={{pathname: "/viewPeople",
                                   state: {coursename: this.state.coursename,
                                           courseid: this.state.courseid,
                                           email: this.state.email } }}>People</Link></button><br/>
                <button className="courseDashButton"><Link className="courseDash" to={{pathname: "/viewFilesforS",
                                   state: {coursename: this.state.coursename,
                                           courseid: this.state.courseid,
                                           email: this.state.email } }}>Files</Link></button><br/>
            </div>
        )
    }

}

export default CourseStud;