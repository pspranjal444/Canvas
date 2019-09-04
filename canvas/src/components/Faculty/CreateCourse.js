import React, {Component} from 'react';
import Axios from 'axios';
import {Redirect} from 'react-router';
import cookie from 'react-cookies';
import Fac_dashboard from './fac_dashboard';

class CreateCourse extends Component{
    constructor(){
        super();

        this.state={
            email: '',
            courseid: '',
            coursename: '',
            coursedept: '',
            coursedesc: '',
            courseroom: '',
            coursecapc: 0,
            wlcapc: 0,
            courseterm: '',
            auth: false
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onSubmit(event){
        event.preventDefault();
        const {email, courseid, coursename, coursedept, coursedesc, courseroom, coursecapc, wlcapc, courseterm} = this.state;
        Axios.post('http://localhost:3001/createcourse', {email, courseid, coursename, coursedept, coursedesc, courseroom, coursecapc, wlcapc, courseterm}, {headers: {'Authorization': localStorage.getItem('authToken')}})
        .then((res)=>{
            if(res.data === true){
                this.setState({
                    auth: true
                })
            }
            else{
                alert('Course with this courseid already exists');
            }
            
            // this.props.history.push('/viewcourses');
        })
    }

    onChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render(){
        // let notCookieSet = null;
        // if(cookie.load('cookie')){
        //     console.log('Hello');
        //     notCookieSet = <Redirect to='/'/>
        // }

        let redirectVar = null;
        if(this.state.auth){
            var em = this.state.email;
            redirectVar = <Redirect to={{
                pathname: "/viewcourses",
                state: {email: em}
            }}/>
        }
        
        return(
            <div>
                {/* {notCookieSet} */}
                {redirectVar}
                <div> 
                    <Fac_dashboard/>
                </div>
                <div style={{display: 'inline-block'}}>
                <h2>Create a Course</h2>
                
                <form onSubmit={this.onSubmit}>
                
                    <input type="email" value={this.state.value} onChange={this.onChange} name="email" id="email" placeholder="Email" required/><br/><br/>
                
                    <input type="text" value={this.state.value} onChange={this.onChange} name="courseid" id="courseid" placeholder="Course ID" required/><br/><br/>
                
                    <input type="text" value={this.state.value} onChange={this.onChange} name="coursename" id="coursename" placeholder="Course Name" maxLength="16" required/><br/><br/>
                
                    <input type="text" value={this.state.value} onChange={this.onChange} name="coursedept" id="coursedept" placeholder="Course Department" required/><br/><br/>
                
                    <textarea value={this.state.value} onChange={this.onChange} name="coursedesc" id="coursedesc" placeholder="Course Description" required/><br/><br/>
               
                    <input type="text" value={this.state.value} onChange={this.onChange} name="courseroom" id="courseroom" placeholder="Course Room" required/><br/><br/>
                
                    <input type="number" value={this.state.value} onChange={this.onChange} name="coursecapc" id="coursecapc" placeholder="Course Capacity" required/><br/><br/>
                
                    <input type="number" value={this.state.value} onChange={this.onChange} name="wlcapc" id="wlcapc" placeholder="Waitlist Capacity" required/><br/><br/>
                
                    <input type="text" value={this.state.value} onChange={this.onChange} name="courseterm" id="courseterm" placeholder="Course Term" required/><br/><br/>
                
                    <input type="submit" value="Submit"/>
                </form>
                </div>
                
            </div>
        );
    }
}

export default CreateCourse;