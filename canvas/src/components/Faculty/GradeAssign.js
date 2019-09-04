import React, {Component} from 'react';
import Axios from 'axios';
import cookie from 'react-cookies';
import Course from './Course';
import {Redirect} from 'react-router';

class GradeAssign extends Component{
    constructor(props){
        super(props);

        this.state={
            grade: 0,
            details: [],
            email: cookie.load('email'),
            courseid: cookie.load('courseid'),
            name: cookie.load('assname'),
            fileRec: '',
            close: '',
            sub: ''
        }

        this.onChange = this.onChange.bind(this);
    
    }

    onChange(event){
        this.setState({
            grade: event.target.value
        })
    }

    componentDidMount(){
        const {email, name, courseid} = this.state;
        Axios.get('http://localhost:3001/getAssignments', {params: {email, courseid, name}}, {headers: {'Authorization': localStorage.getItem('authToken')}})
        .then(res=>{
            this.setState({
                details: this.state.details.concat(res.data)
            })
        });
    }

    render(){

        let redirectVar = null;
        if(!(cookie.load('email'))){
            redirectVar = <Redirect to='/'/>
        }

        let display = this.state.details.map(item=>{
            return(
            <tr>
                <td>{item.email}</td>
                <td>{item.link}</td>
                <td><a style={{WebkitTextFillColor: '#0055A2', textDecoration: 'underline', cursor: 'pointer'}} onClick={()=>{
                    cookie.save('filename', item.filename);
                    this.setState({
                        fileRec: <embed src={item.fileLocation} type="application/pdf" width="800px" height="800px"/>,
                        close: 'CLOSE(X)'
                    })
                }}>{item.filename}</a></td>
                <td><input style={{width: '35px'}} type="number" name="grade" id="grade" onChange={this.onChange}/></td>
                <td><button name="submit" id="submit" onClick={()=>{
                    const email = item.email;
                    const {courseid, name, grade} = this.state;
                    Axios.post('http://localhost:3001/submitGrades', {email, courseid, name, grade}, {headers: {'Authorization': localStorage.getItem('authToken')}})
                    .then(res=>{
                        console.log('Submitted');
                        this.setState({
                            sub: 'Submitted'
                        })
                    })
                }}>Submit</button></td>
                <td style={{border: '2px solid white'}}><p style={{WebkitTextFillColor: 'red'}}>{this.state.sub}</p></td>
            </tr>);
        });

        return(
            <div>
                {redirectVar}
                <div>
                    <Course/>
                </div>
                <div style={{display: 'inline-block'}}>
                    <h2>View Students</h2>
                    <h5>{this.state.email}</h5>
                    <table>
                            <thead>
                                <tr>
                                    <th>Email</th>
                                    <th>Link</th>
                                    <th>File</th>
                                    <th>Grade</th>
                                    <th>Submit</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* <Link to={{
                                    pathname: "/course",
                                    state: {courseid: details.courseid}
                                }}> {details}</Link>*/}
                                {display} 
                            </tbody>
                    </table>
                </div>
                <div>
                    <a style={{WebkitTextFillColor: 'red', textDecoration: 'underline', cursor: 'pointer'}} onClick={()=>{
                        this.setState({
                            fileRec: '',
                            close: ''
                        })
                    }}>{this.state.close}</a>
                    <br/>
                    {this.state.fileRec}
                    
                     
                </div>
            </div>   
        );
    }
}

export default GradeAssign;