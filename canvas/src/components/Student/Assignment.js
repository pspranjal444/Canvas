import React, { Component } from "react";
import cookie from "react-cookies";
import AssignmentCard from './AssignmentCard';
import Axios from 'axios';
import CourseStud from "./CourseStud";
import {Redirect} from 'react-router';


class ViewAssignment extends Component{
    constructor(props){
        super(props);

        this.state={
            items: [],
            itemsSub: [],
            courseid: cookie.load('courseid'),
            email: cookie.load('email')
        }
    }

    componentDidMount(){
        const {courseid, email} = this.state;
        Axios.get('http://localhost:3001/getassn', {params: {courseid}, headers: {'Authorization': localStorage.getItem('authToken')}})
        .then(res=>{
            this.setState({
                items: this.state.items.concat(res.data)
            })
        });
        console.log('HELLO');
        Axios.get('http://localhost:3001/getSubAssn', {params: {email, courseid}, headers: {'Authorization': localStorage.getItem('authToken')}})
        .then(res=>{
            console.log(res.data);
            this.setState({
    
                itemsSub: this.state.itemsSub.concat(res.data)
            })
        });
    }

    render(){
        let redirectVar = null;
        if(!(cookie.load('email'))){
            redirectVar = <Redirect to='/'/>
        }

        var details = this.state.items.map(item=>{
            return(
                <AssignmentCard name={item.name} descp={item.descp}/>
            )
            
        });

        var detailsSub = this.state.itemsSub.map(item=>{
            return(
                <tr key={item.name}>
                    <td>{item.name}</td>
                </tr>
            )
        });

        return(

            <div>
                {redirectVar}
                <div><CourseStud/></div>
                <h3>Assignments</h3>
                <div style={{display: 'contents'}}>
                    {details}
                </div>
                <div>

                <h4>Assignments Submitted Previously</h4>
                <table style={{display: 'inline-block'}}>
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
                                {detailsSub} 
                            </tbody>
                </table>
                </div>
            </div>
        )
    }
}

export default ViewAssignment;