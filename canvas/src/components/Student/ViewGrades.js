import React, {Component} from 'react';
import Axios from 'axios';
import cookie from 'react-cookies';
import CourseStud from './CourseStud';
import {Redirect} from 'react-router';


class ViewGrades extends Component{
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
        Axios.get('http://localhost:3001/getGrades', {params: {email, courseid}, headers: {'Authorization': localStorage.getItem('authToken')}})
        .then(res=>{
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

        var display = this.state.details.map(item=>{
            return(
                <tr key={item.name}>
                    <td>{item.name}</td>
                    <td>{item.grade}</td>
                </tr>
            );
        })

        return(
            <div>
                {redirectVar}
                <div>
                    <CourseStud/>
                </div>
                <div style={{display: 'inline-block'}}>
                <h2>View Grades</h2>
                    <table>
                        <thead >
                            <th>Type</th>
                            <th>Grade</th>
                        </thead>
                        <tbody>
                            {display}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

}

export default ViewGrades;