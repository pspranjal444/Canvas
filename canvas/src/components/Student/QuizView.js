import React, {Component} from 'react';
import CourseStud from './CourseStud';
import Axios from 'axios';
import ViewQuizPage from './ViewQuizPage';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';



class QuizView extends Component{
    constructor(props){
        super(props);

        this.state={
            items: [],
            count: 0,
            details: '',
            question: 'Question',
            statement: '',
            nextButton: <button style={{width: '100px'}} onClick={this.onClick.bind(this)}>Next</button>,
            corans: [],
            grade: 0
        }

        
        
        // this.onClick = this.onClick.bind(this);
    }

    componentDidMount(){
        const courseid = cookie.load('courseid');
        Axios.get('http://localhost:3001/getQuiz', {params: {courseid}, headers: {'Authorization': localStorage.getItem('authToken')}})
        .then(res => {
            
            this.setState({
                items: this.state.items.concat(res.data)
            })
            var det = this.state.items.map(item=>{
                return(
                    <ViewQuizPage key={item.ques} ques={item.ques} op1={item.op1} op2={item.op2} op3={item.op3} op4={item.op4}/>
                )
            });
            
            this.setState({
                details: det
            })
        });

        Axios.get('http://localhost:3001/getCorAns', {params: {courseid}, headers: {'Authorization': localStorage.getItem('authToken')}})
        .then(res=>{
            this.setState({
                corans: this.state.corans.concat(res.data)
            })
        })
    }

    

    onClick(){
        var x = this.state.count;
        if(this.state.count < this.state.details.length-1){
            this.setState({
                count: x + 1
            })
        }
        else{
            const email = cookie.load('email');
            const courseid = cookie.load('courseid');
            this.setState({
                statement: 'Quiz Complete!!',
                question: '',
                count: '',
                nextButton: ''
            })
            var ans;
            Axios.get('http://localhost:3001/getStudAns', {params: {email, courseid}, headers: {'Authorization': localStorage.getItem('authToken')}})
            .then(res=>{
                
                ans = res.data;
                console.log(ans);
                
                var i;
                for( i=0; i<ans.length; i++ ){
                    console.log('CORANS', this.state.corans[i]['corans']);
                    console.log('ANS', ans[i]['ans'])
                    var sc = this.state.grade;
                    if(this.state.corans[i]['corans'] === (ans[i]['ans'])){
                        console.log('State Changed');
                        this.setState({
                            grade: sc + 1
                        })
                    }
                }
                
                const {grade} = this.state;
                const name = 'Quiz';
                Axios.post('http://localhost:3001/submitGrades', {email, courseid, name, grade}, {headers: {'Authorization': localStorage.getItem('authToken')}})
                .then(res=>{
                    console.log(grade);
                    console.log('Grades Submitted');
                })
            })
        }
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
                    <CourseStud/>
                </div>
                <div style={{display: 'inline-block'}}>
                    <h2>Quiz</h2>
                    <h6>{this.state.question} {this.state.count}</h6>
                    {this.state.details[this.state.count]}
                    {this.state.nextButton}
                </div>
                    
                <h2 style={{color: 'red'}}>{this.state.statement}</h2>
            </div>
        );
    }
}

export default QuizView;