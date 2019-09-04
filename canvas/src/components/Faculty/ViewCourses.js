import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import CourseCard from './CourseCard';
import Fac_dashboard from './fac_dashboard';
import {Redirect} from 'react-router';
import cookie from 'react-cookies';

class ViewCourses extends Component{
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
        // axios.defaults.headers.all['headers'] = localStorage.getItem('authToken');
        axios.get('http://localhost:3001/getcourses/', {params: {email}, headers: {'Authorization': localStorage.getItem('authToken')}})
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
                
                <CourseCard key={item.courseid} courseid={item.courseid} coursename={item.coursename} email={this.state.email}/>
               
               
            )
        })
        console.log();
        return(
            <div>
            {redirectVar}
            <div>
                <Fac_dashboard/>
            </div>
            
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

export default ViewCourses;