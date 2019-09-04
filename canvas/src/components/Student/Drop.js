import React, {Component} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router';
import Stu_dashboard from './stu_dashboard';
import cookie from 'react-cookies';

class Drop extends Component{
    constructor(props){
        super(props);

        this.state={
            email: this.props.location.state.email,
            items: [],
            auth: ''
        }
    }

    componentDidMount(){
        
        const {email} = this.state;
        axios.get('http://localhost:3001/getcoursesReg', {params: {email}, headers: {'Authorization': localStorage.getItem('authToken')}})
        .then(res=>{
            // console.log(res.data);
            this.setState({
                items: this.state.items.concat(res.data)
            })
            
        });
    }

    render(){
        
        let redirectVar = null;
        if(!(cookie.load('email'))){
            redirectVar = <Redirect to='/'/>
        }
        
        let details = this.state.items.map(item => {
            return(
                
                <tr key={item.courseid}>
                    <td>{item.courseid}</td> 
                    <td>{item.coursename}</td>
                    <td><button key={item.courseid} onClick={()=>{
                        const {email} = this.state;
                        const courseid = item.courseid;
                        axios.post('http://localhost:3001/drop', {email, courseid}, {headers: {'Authorization': localStorage.getItem('authToken')}})
                        .then(res=>{
                            if(res){
                                this.setState({
                                    auth: 'true'
                                })
                                alert('Successfully Dropped');
                                window.location.reload();   
                            }
                            
                        });
                    }}>Drop</button></td>
                </tr>
               
            )
        })

        // let redirectVar = null;
        // console.log(this.state.auth);
        // if(this.state.auth === true){
        //     redirectVar = <Redirect to="/dropp"/>
        // }
        // this.props.history.replace('/dropp');
        return(
            
            <div>
                {redirectVar}
                {/* <Redirect to="/dropp"/> */}
                <div><Stu_dashboard/></div>
                <div style={{display: 'inline-block'}}>
                <h2>Drop Courses</h2>
                <h5>{this.state.email}</h5>
                <table style={{textAlign: "center"}}>
                            <thead>
                                <tr>
                                    <th>Course ID</th>
                                    <th>Course Name</th>
                                    <th>Drop</th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                                {/* <Link to={{
                                    pathname: "/course",
                                    state: {courseid: details.courseid}
                                }}> {details}</Link>*/}
                                {details} 
                            </tbody>
                </table>
            </div>
            </div>
        );
    }
}

export default Drop;