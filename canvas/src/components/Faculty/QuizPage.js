import React, {Component} from 'react';
import Axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

class QuizPage extends Component{
    constructor(){
        super();

        this.state={
            email: cookie.load('email'),
            courseid: cookie.load('courseid'),
            ques: '',
            op1: '',
            op2: '',
            op3: '',
            op4: '',
            ca: ''
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onSubmit(){
        const {email, courseid, ques, op1, op2, op3, op4, ca} = this.state; 
        Axios.post('http://localhost:3001/addQuizQues', {email, courseid, ques, op1, op2, op3, op4, ca}, {headers: {'Authorization': localStorage.getItem('authToken')}})
        .then(res=>{
            console.log('Question Submitted');
        });
    }    

    render(){
        let redirectVar = null;
        if(!(cookie.load('email'))){
            redirectVar = <Redirect to='/'/>
        }
        return(
            <div>
                {redirectVar}
                <form onSubmit={this.onSubmit}>
                    <input type="text" value={this.state.value} onChange={this.onChange} name="ques" id="ques" placeholder="Question" required/><br/><br/>
                    <input type="text" value={this.state.value} onChange={this.onChange} name="op1" id="op1" placeholder="Option 1" required/><br/><br/>
                    <input type="text" value={this.state.value} onChange={this.onChange} name="op2" id="op2" placeholder="Option 2" required/><br/><br/>
                    <input type="text" value={this.state.value} onChange={this.onChange} name="op3" id="op3" placeholder="Option 3" required/><br/><br/>
                    <input type="text" value={this.state.value} onChange={this.onChange} name="op4" id="op4" placeholder="Option 4" required/><br/><br/>
                    <input type="text" value={this.state.value} onChange={this.onChange} name="ca" id="ca" placeholder="Correct Answer" required/><br/><br/>
                    <input type="submit" value="Add"/>
                </form>
            </div>
        );
    }
}

export default QuizPage;