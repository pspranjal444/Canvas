import React, {Component} from 'react';
import Axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';


class ViewQuizPage extends Component{
    constructor(props){
        super(props);

        this.state={
            email: cookie.load('email'),
            courseid: cookie.load('courseid'),
            op1: this.props.op1,
            op2: this.props.op2,
            op3: this.props.op3,
            op4: this.props.op4,
            option: '',
        }
        this.onChange = this.onChange.bind(this);
        
    }

    quizDone(){
        const ques = this.props.ques;
        const {option} = this.state;
        const email = cookie.load('email');
        const courseid = cookie.load('courseid');
        console.log('Value', option);
        
        Axios.post('http://localhost:3001/submitQuiz', {email, courseid, ques, option}, {headers: {'Authorization': localStorage.getItem('authToken')}})
        .then(res=>{
            console.log('Done');
        })
    }

    onChange(event){
        this.setState({
            option: event.target.value
        })
    }

    render(){
        let redirectVar = null;
        if(!(cookie.load('email'))){
            redirectVar = <Redirect to='/'/>
        }
        return(
            <div>
                {redirectVar}
                <p>{this.props.ques}</p><br/><br/>
                <input type="radio" name="opt" value={this.state.op1} onChange={this.onChange}/>
                <label>
                    
                    {this.props.op1}   
                </label><br/><br/>

                <input type="radio" name="opt" value={this.state.op2} onChange={this.onChange}/>
                <label>
                    
                    {this.props.op2}
                </label><br/><br/>

                <input type="radio" name="opt" value={this.state.op3} onChange={this.onChange}/>
                <label>
                    
                    {this.props.op3} 
                </label><br/><br/>

                <input type="radio" name="opt" value={this.state.op4} onChange={this.onChange}/>
                <label>
                    
                    {this.props.op4}
                </label><br/><br/>
                <input type="button" onClick={this.quizDone.bind(this)} value="Submit"/>
            </div>
        )
    }
}

export default ViewQuizPage;