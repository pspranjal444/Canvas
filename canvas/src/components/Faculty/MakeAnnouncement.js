import React, {Component} from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import Course from './Course';
import {Redirect} from 'react-router';

class MakeAnnouncement extends Component{
    constructor(props){
        super(props);
        this.state={
            courseid: cookie.load('courseid'),
            email: cookie.load('email'),
            name: '',
            descp: '',
            created: 0,
            anncs: []
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
        const {courseid, email, name, descp} = this.state;
        axios.post('http://localhost:3001/makeanncn', {courseid, email, name, descp}, {headers: {'Authorization': localStorage.getItem('authToken')}})
        .then(res=>{
            console.log('Announcement Created');
            alert('Announcement Created');   
            if(res.data === true){
                this.setState({created: 1 });
            }
        })
    }

    componentDidMount(){
        const {email, courseid} = this.state;
        axios.get('http://localhost:3001/getanncn', {params: {email, courseid}, headers: {'Authorization': localStorage.getItem('authToken')}})
        .then(res => {
            this.setState({
                anncs: this.state.anncs.concat(res.data)
            })            
        })
    }

    render(){
        let redirectVar = null;
        if(!(cookie.load('email'))){
            redirectVar = <Redirect to='/'/>
        }
        let details = this.state.anncs.map(item => {
            return(
                <tr>
                    <td>{item.name}</td> 
                    <td>{item.descp}</td>
                </tr>
            )
        });
        return(
            
            <div>
                {redirectVar}
                <div>
                    <Course/>
                </div>
                <div style={{display: 'inline-block'}}>
                <h2>Make a New Announcement</h2>
                <h5>{this.state.coursename} - {this.state.courseid}</h5>
                <form onSubmit={this.onSubmit}>
                    <input type="text"  name="name" id="name" value={this.state.name} onChange={this.onChange} placeholder="Announcement Name" required/><br/><br/>

                    <textarea name="descp" id="descp" value={this.state.descp} onChange={this.onChange} placeholder="Announcement Description" required/><br/><br/>

                    <input type="submit" value="Create"/> 
                </form>
                <br/><br/>
                <h3><i>Previous Announcements</i></h3>
                
                <table style={{display: 'inline-block', border: '10px'}}>
                            <thead>
                                <tr>
                                    <th>Announcement</th>
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

export default MakeAnnouncement;