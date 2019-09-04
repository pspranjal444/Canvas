import React, { Component } from 'react';
import axios from 'axios';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import '../style.css';
import {selUser} from '../actions/index';
import {setEmail} from '../actions/index';
import {setPassword} from '../actions/index';
import {setDetails} from '../actions/index';
import {inv_log} from '../actions/index';
import {fetchFaculty} from '../actions/index';
import {fetchStudent} from '../actions/index';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';

class Signin extends Component{
    constructor(){
        super();

        this.state={
            email: '',
            password: '',
            category: '',
        //     // auth: '',
        //     // invalidMessage: ''
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        
        // this.onChange = this.onChange.bind(this);
    }

    // onSubmit(event){
    //     event.preventDefault();
    //     const {email, password, category} = this.state;
    //     console.log('Sending data');
    //     axios.post('http://localhost:3001/signin', {
    //         email,
    //         password,
    //         category
    //         }).then(res=>{
    //             console.log(res.data);
    //             cookie.save('email', email, {path: '/'});
    //             if(res.data === true){
    //                 this.setState({auth: res.data });
    //             }
    //             else{
    //                 this.setState({
    //                     invalidMessage: 'Invalid Details. Please try again!'
    //                 })
    //             }
                
    //             // this.props.history.push("/facdash");
    //     })
    // }

    onSubmit(event){
        event.preventDefault();
        const {email, password, category} = this.state;
        console.log('Sending data');
        axios.post('http://localhost:3001/signin', {
            email,
            password,
            category
            }).then(res=>{
                console.log(res.data);
                cookie.save('email', email);
                if(res.data.result){
                    // this.setState({auth: res.data });
                    console.log('TOKEN', res.data.token);
                    localStorage.setItem('authToken', res.data.token);
                    this.props.selUser();
                    // this.props.setEmail(email);
                    // this.props.setPassword(password);
                    const data = {
                        email: email,
                        password: password,
                        category: category
                    }
                    this.props.setDetails(data);
                    if(this.state.category === "Faculty"){
                        this.props.fetchFaculty(email);
                    }
                    else if (this.state.category === "Student"){
                        this.props.fetchStudent(email);
                    }
                }
                else{
                    this.props.inv_log();
                    // this.setState({
                    //     invalidMessage: 'Invalid Details. Please try again!'
                    // })
                }
                
                // this.props.history.push("/facdash");
        })
    }

    onChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render(){
        var catg = '';
        let redirectVar = null;
        var auth = this.props.auth;
        var details = this.props.details;
        if(this.state.category === "Faculty"){
            catg = "/facdash";
        }

        if(this.state.category === "Student"){
            catg = "/studash";
        }

        if(auth){
            var em = this.state.email;
            redirectVar = <Redirect to={{
                pathname: catg,
                state: {email: em}
            }}/>
        }
        return(
            <div>
                {redirectVar}
                <br/>
                <img src="http://www.sjsu.edu/people/annette.nellen/website/SJSU%20Primary%20mark_Web.png" style={{height: '40px', width: '200px'}}/>
                <h2>Sign In</h2>
                <p style={{WebkitTextFillColor: 'red'}}>{this.props.invalidMessage}</p>
                <form onSubmit={this.onSubmit}>
                
                    <input className="inputtxt" type="email" value={this.state.email} onChange={this.onChange} name="email" id="email" placeholder="Email" required/><br/><br/>
                   
                    <input className="inputtxt" type="password" value={this.state.password} onChange={this.onChange} name="password" id="password" placeholder="Password" required/><br/><br/>
                    
                    <label className="labelfont">
                        Student:
                        <input className="radioformat" type="radio" name="category" value="Student" onChange={this.onChange} required/>  
                    </label>
                    
                    <label className="labelfont">
                        Faculty:
                        <input className="radioformat" type="radio" name="category" value="Faculty" onChange={this.onChange} required/>  <br/>
                    </label>
                    
                    <input type="submit" value="Login"/>
                </form>
                <a style={{WebkitTextFillColor: '#0055A2'}} href='/signup'>Sign Up</a>
            </div>
        );
    }

    
}

function mapStateToProps(state){
    return{
        auth: state.auth,
        invalidMessage: state.invalidMessage,
        details: state.details
    };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({selUser: selUser, inv_log: inv_log, fetchFaculty: fetchFaculty, fetchStudent: fetchStudent, setDetails: setDetails}, dispatch);
}




export default connect(mapStateToProps, mapDispatchToProps)(Signin);