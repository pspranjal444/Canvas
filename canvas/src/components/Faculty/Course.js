import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

class Course extends Component{
    constructor(props){
        super(props);

        this.state={
            coursename: cookie.load('coursename'),
            courseid: cookie.load('courseid'),
            email: cookie.load('email')
        }
        
    }
   
    render(){
        // cookie.remove('coursename');
        // cookie.remove('courseid');
        // cookie.remove('email');
        let redirectVar = null;
        if(!(cookie.load('email'))){
            redirectVar = <Redirect to='/'/>
        }
        return(
            <div style={{float: 'left'}}>
            {redirectVar}
                <h2 style={{height: 'auto', width: '195px'}}>{this.state.coursename} - {this.state.courseid}</h2>
                <button style={{backgroundColor: 'red', width: '187px'}}><Link className="courseDashR" to={{pathname: "/viewcourses",
                                   state: {coursename: this.state.coursename,
                                           courseid: this.state.courseid,
                                           email: this.state.email } }}>BACK</Link></button><br/>
                <button className="courseDashButton"><Link className="courseDash" to={{pathname: "/inboxF",
                                   state: {coursename: this.state.coursename,
                                           courseid: this.state.courseid,
                                           email: this.state.email } }}>Inbox</Link></button><br/>
                <button className="courseDashButton"><Link className="courseDash" to={{pathname: "/createassn",
                                   state: {coursename: this.state.coursename,
                                           courseid: this.state.courseid,
                                           email: this.state.email } }}>Create Assignment</Link></button><br/>
                <button className="courseDashButton"><Link className="courseDash" to={{pathname: "/createQuiz",
                                   state: {coursename: this.state.coursename,
                                           courseid: this.state.courseid,
                                           email: this.state.email } }}>Create Quiz</Link></button><br/>
               
                <button className="courseDashButton"><Link className="courseDash" to={{pathname: "/makeanncn",
                                   state: {coursename: this.state.coursename,
                                           courseid: this.state.courseid,
                                           email: this.state.email } }}>Make Announcement</Link></button><br/>
                <button className="courseDashButton"><Link className="courseDash" to={{pathname: "/viewStudents",
                                   state: {coursename: this.state.coursename,
                                           courseid: this.state.courseid,
                                           email: this.state.email } }}>View Students</Link></button><br/>
                <button className="courseDashButton"><Link className="courseDash" to='/viewgradeassn'>Grade Assignment</Link></button><br/>
                <button className="courseDashButton"><Link className="courseDash" to='/fileUpload'>Upload</Link></button><br/>
                
                {/* <button className="courseDashButton"><Link className="courseDash" to=''>Remove Student</Link></button> */}
            </div>
        )
    }

}

export default Course;