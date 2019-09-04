import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

class Fac_dashboard extends Component{

    constructor(props){
        super(props);
        this.state = {
            email: ''
        }
        this.onClick = this.onClick.bind(this);
    }

    componentDidMount(){
        var cookieD = cookie.load('email');
        console.log(cookieD);
        this.setState({
            email: cookieD
        })
    }    

    onClick(){
        cookie.remove('email');
        cookie.remove('courseid');
        cookie.remove('coursename');
    }
    
    render(){
        let redirectVar = null;
        if(!(cookie.load('email'))){
            redirectVar = <Redirect to='/'/>
        }
        return(
            
            <div style={{float: 'left'}}>
            {redirectVar}
                <h2>Dashboard</h2>
                <img style={{height: '120px', width: '120px'}} src="https://a.espncdn.com/i/teamlogos/ncaa/500/23.png" alt="SJSU Logo"/>
                <h4><Link style={{WebkitTextFillColor: '#0055A2', textDecoration: 'none', letterSpacing: '0px'}} to='/facdash'>{this.state.email}</Link></h4>
                <button style={{width: '187px'}}><Link to={{
                    pathname: "/updateProfileF",
                    state: {email: this.state.email}
                }}>Update Profile</Link></button><br/>
                <button style={{width: '187px'}}><Link to={{
                    pathname: "/createcourse",
                    state: {email: this.state.email}
                }}>Create Course</Link></button><br/>
                <button style={{width: '187px'}}><Link to={{
                    pathname: "/viewcourses",
                    state: {email: this.state.email}
                }}>View Courses</Link></button><br/>
                <button style={{width: '187px'}}><Link to='/' onClick={this.onClick}>Logout</Link></button>
            </div>
        );
    }
}

export default Fac_dashboard;