import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import { bindActionCreators } from 'C:/Users/User/AppData/Local/Microsoft/TypeScript/3.2/node_modules/redux';
import {fetchMessages} from '../../actions/index';
import {connect} from 'react-redux';

class Stu_dashboard extends Component{

    onClick(){
        cookie.remove('email');
        cookie.remove('courseid');
        cookie.remove('coursename');
    }

    componentDidMount(){
        this.props.fetchMessages(cookie.load('email'));   
    }
    
    render(){
        let redirectVar = null;
        if(!(cookie.load('email'))){
            redirectVar = <Redirect to='/'/>
        }
        var email = cookie.load('email');
        return(
        
            <div style={{float: 'left'}}>
            {redirectVar}
                <h2>Dashboard</h2>
                <img style={{height: '120px', width: '120px'}} src="https://a.espncdn.com/i/teamlogos/ncaa/500/23.png" alt="SJSU Logo"/>
                
                <h4><Link style={{WebkitTextFillColor: '#0055A2', textDecoration: 'none', letterSpacing: '0px'}} to='/studash'>{email}</Link></h4>
                <button style={{width: '187px'}}><Link to='/updateProfileS'>Update Profile</Link></button><br/>
                
                <button style={{width: '187px'}}><Link to={{
                    pathname: "/enroll",
                    state: {email: email}
                }}>Enroll</Link></button><br/>

                <button style={{width: '187px'}}><Link to={{
                    pathname: "/dropp",
                    state: {email: email}
                }}>Drop a Course</Link></button><br/>

                

                <button style={{width: '187px'}}><Link to={{
                    pathname: "/courseDesc",
                    state: {email: email}
                }}>View Courses</Link></button><br/>

                <button style={{width: '187px'}}><Link to={{
                    pathname: "/inboxS",
                    state: {email: email}
                }}>Inbox</Link></button><br/>


                <button style={{width: '187px'}}><Link to='/' onClick={this.onClick.bind(this)}>Logout</Link></button>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({fetchMessages: fetchMessages}, dispatch);
}

export default connect(null, mapDispatchToProps)(Stu_dashboard);