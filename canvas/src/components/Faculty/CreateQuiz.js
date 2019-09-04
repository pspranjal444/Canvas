import React, {Component} from 'react';
import axios from 'axios';
import Course from './Course';
import QuizPage from './QuizPage';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

class CreateQuiz extends Component{
    constructor(){
        super();

        // this.state={
        //     questions: [],
        //     option1: [],
        //     option2: [],
        //     option3: [],
        //     option4: [],
        // }

        
    }   

    render(){
        let redirectVar = null;
        if(!(cookie.load('email'))){
            redirectVar = <Redirect to='/'/>
        }
        return(
            <div>
                {redirectVar}
                <div>
                    <Course/>
                </div>
                
                
                <div style={{display: 'inline-block'}}>
                    <h2>Create a Quiz</h2>
                    <QuizPage/>
                </div>
                
            </div>
            
        );
    }
}

export default CreateQuiz;