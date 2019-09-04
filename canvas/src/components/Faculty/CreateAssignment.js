import React, {Component} from 'react';
import axios from 'axios';
import Course from './Course';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

class CreateAssignment extends Component{
    constructor(props){
        super(props);
        this.state={
            coursename: cookie.load('coursename'),
            courseid: cookie.load('courseid'),
            email: cookie.load('email'),
            name: '',
            descp: '',
            created: 0,
            assns: []
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        
    }

    onChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onSubmit(event){
        // event.preventDefault();
        const {courseid, coursename, email, name, descp} = this.state;
        axios.post('http://localhost:3001/createassn', {courseid, coursename, email, name, descp}, {headers: {'Authorization': localStorage.getItem('authToken')}})
        .then(res=>{
            console.log('Assignment Created');
            alert('Assignment Created');   
            if(res.data === true){
                this.setState({created: res.data });
            }
        })
    }

    componentDidMount(){
        
        const {email, courseid} = this.state;
        axios.get('http://localhost:3001/getassn', {params: {email, courseid}, headers: {'Authorization': localStorage.getItem('authToken')}})
        .then(res => {
            this.setState({
                assns: this.state.assns.concat(res.data)
            })            
        })
    }

    render(){
        let details = this.state.assns.map(item => {
            return(
                <tr>
                    <td>{item.name}</td> 
                    <td>{item.descp}</td>
                </tr>
            )
        });
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
                <h2>Create Assignment</h2>
                <h5>{this.state.coursename} - {this.state.courseid}</h5>
                <form onSubmit={this.onSubmit}>
                    <input type="text"  name="name" id="name" value={this.state.name} onChange={this.onChange} placeholder="Assignment Name" required/><br/><br/>

                    <textarea name="descp" id="descp" value={this.state.descp} onChange={this.onChange} placeholder="Assignment Description" required/><br/><br/>

                    <input type="submit" value="Create"/> 
                </form>
                <br/><br/>
                <h3><i>Previous Assignments</i></h3>
                
                <table>
                            <thead>
                                <tr>
                                    <th>Assignment Name</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                
                                {details} 
                            </tbody>
                </table>
                </div>
                
                
            </div>
        );
    }
}

export default CreateAssignment;