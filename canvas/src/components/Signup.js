import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import { bindActionCreators } from 'C:/Users/User/AppData/Local/Microsoft/TypeScript/3.2/node_modules/redux';
import {successClick} from '../actions/index';
import {setSignUpDetails} from '../actions/index';
// import {inv_log} from '../actions/index';

class Signup extends Component{
    constructor(){
        super();

        this.state={
            name: '',
            password: '',
            category: '',
            email: '',
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onSubmit(event){
        event.preventDefault();
        
        const {name, password, category, email} = this.state;
        const data = {name: this.state, 
                      password: this.state, 
                      category: this.state, 
                      email: this.state}
        axios.post('http://localhost:3001/signup', {name, password, category, email})
        .then((res) => {
            console.log('Submitted');
            // this.props.history.push('/');
            this.props.setSignUpDetails(data);
            if(res.data === true){
                this.props.successClick();
            }
            else{
                alert('User already exists');
            }
            
        })
    }

    onChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
        
    }

    render(){
        return(
            <div>
                <br/>
                <img src="http://www.sjsu.edu/people/annette.nellen/website/SJSU%20Primary%20mark_Web.png" style={{height: '40px', width: '200px'}}/>
                
                <h2>Sign Up</h2>
                <p style={{WebkitTextFillColor: 'green'}}>{this.props.successMessage}</p>
                <form onSubmit={this.onSubmit}>
                
                    <input type="text" value={this.state.value} onChange={this.onChange} name="name" id="name" placeholder="Name" required/> <br/><br/>
                    
                    <input type="email" value={this.state.value} onChange={this.onChange} name="email" id="email" placeholder="Email" required/><br/><br/>
                    <input type="password" value={this.state.value} onChange={this.onChange} name="password" id="password" placeholder="Password" required/><br/><br/>
                    <label>
                        Student:
                        <input type="radio" name="category" value="Student" onChange={this.onChange} required/>  
                    </label>
                    <label>
                        Faculty:
                        <input type="radio" name="category" value="Faculty" onChange={this.onChange} required/> <br/> 
                    </label>
                    
                    <input type="submit" value="Sign Up"/>
                </form>
                <a style={{WebkitTextFillColor: '#0055A2'}} href='/'>Sign In</a>
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        successMessage: state.successMessage,
        sgupdetails: state.sgupdetails
    };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({successClick: successClick, setSignUpDetails: setSignUpDetails}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);