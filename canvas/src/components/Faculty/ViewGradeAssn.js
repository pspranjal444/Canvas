import React, {Component} from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import {Link} from 'react-router-dom';
import Course from './Course';
import {Redirect} from 'react-router';

class ViewGradeAssn extends Component{
    constructor(props){
        super(props);

        this.state={
            email: cookie.load('email'),
            courseid: cookie.load('courseid'),
            details: []
        }
    }

    componentDidMount(){
        const {email, courseid} = this.state;
        axios.get('http://localhost:3001/getassn', {params: {email, courseid}, headers: {'Authorization': localStorage.getItem('authToken')}})
        .then(res => {
            this.setState({
                details: this.state.details.concat(res.data)
            })            
        })
    }

    render(){
        let redirectVar = null;
        if(!(cookie.load('email'))){
            redirectVar = <Redirect to='/'/>
        }
        let display = this.state.details.map(item=>{
            return(
                <tr key={item.name}>
                    <td><button onClick={()=>{cookie.save('assname', item.name)}}><Link to="/gradessn" onClick={()=>{cookie.save('assname', item.name)}}>{item.name}</Link></button></td>
                </tr>
            );
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
                                    <th>Assignment Name</th>
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
            </div>
        );
    }
}

export default ViewGradeAssn;