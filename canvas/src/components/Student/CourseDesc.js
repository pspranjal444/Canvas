import React, {Component} from 'react';
import axios from 'axios';
import CourseCardStud from './CourseCardStud';
import Stu_dashboard from './stu_dashboard';
import {Redirect} from 'react-router';
import cookie from 'react-cookies';

class CoursesDesc extends Component{
    constructor(props){
        super(props);
        this.state={
            items: [],
            email: this.props.location.state.email
        }
    }

    componentDidMount(){
        console.log(this.state.email);
        const {email} = this.state; 
        axios.get('http://localhost:3001/getcoursesReg/', {params: {email}, headers: {'Authorization': localStorage.getItem('authToken')}})
        .then(res=>{
            // console.log(res.data);
            this.setState({
                items: this.state.items.concat(res.data)
            })
            
        });
    }

    render(){
        let redirectVar = null;
        if(!(cookie.load('email'))){
            redirectVar = <Redirect to='/'/>
        }
        
        let details = this.state.items.map(item => {
            return(
                
                <CourseCardStud courseid={item.courseid} coursename={item.coursename} email={this.state.email}/>
               
               
            )
        })
        console.log();
        return(
            <div>
                {redirectVar}
            <div><Stu_dashboard/></div>
            
            <div style={{display: 'inline-block'}}>
            <h2>View Courses</h2>
                {/* <h5>{this.props.location.state.email}</h5> */}
                <div style={{height: 'auto', width: '1000px', marginTop: '40px', display: 'inline-block'}}>
                    {details}
                </div>
            </div>
                
            </div>
        )
    }
}

export default CoursesDesc;