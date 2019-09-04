import React, {Component} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router';
import cookie from 'react-cookies';
import Course from './Course';

class ViewStudents extends Component{
    constructor(props){
        super(props);

        this.state={
            email: cookie.load('email'),
            courseid: cookie.load('courseid'),
            items: [],
            auth: '',
            itemsWL: [],
            page: 0,
            limit: 4
        }

        this.nxtHandler = this.nxtHandler.bind(this);
        this.prvHandler = this.prvHandler.bind(this);
    }

    prvHandler(e){
        // this.setState({
        //     items: []
        // })
        let t = this.state.page-1;
        if(t<0 || this.state.page===0){
            t=0;
        }
        else{
            this.paginate(-1);
        }
        const {limit, courseid} = this.state;
        axios.get('http://localhost:3001/getStudents', {params: {courseid, limit, t}, headers: {'Authorization': localStorage.getItem('authToken')}})
        .then(res=>{
            this.setState({
                items: res.data
                // items: this.state.items.concat(res.data)
            })
        })
    }

    nxtHandler(e){
        // this.setState({
        //     items: []
        // })
        this.paginate(1);
        let t = this.state.page + 1;
        const {limit, courseid} = this.state;
        axios.get('http://localhost:3001/getStudents', {params: {courseid, limit, t}, headers: {'Authorization': localStorage.getItem('authToken')}})
        .then(res=>{
            this.setState({
                items: res.data
                // items: this.state.items.concat(res.data)
            })
        })
    }

    paginate(n){
        this.setState({
            page: this.state.page + n
        })
    }

    componentDidMount(){
        // const {courseid} = this.state;
        // axios.get('http://localhost:3001/getStudents', {params: {courseid}})
        // .then(res=>{
        //     // console.log(res.data);
        //     this.setState({
        //         items: this.state.items.concat(res.data)
        //     })
        // });

        let t = this.state.page-1;
        if(t<0 || this.state.page===0){
            t=0;
        }
        else{
            this.paginate(-1);
        }
        const {limit, courseid} = this.state;
        axios.get('http://localhost:3001/getStudents', {params: {courseid, limit, t}, headers: {'Authorization': localStorage.getItem('authToken')}})
        .then(res=>{
            this.setState({
                items: res.data
            })
        })

        axios.get('http://localhost:3001/getWLStudents', {params: {courseid}, headers: {'Authorization': localStorage.getItem('authToken')}})
        .then(res=>{
            // console.log(res.data);
            this.setState({
                itemsWL: this.state.itemsWL.concat(res.data)
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
                    <td>{item.name}</td> 
                    <td>{item.email}</td>
                    <td>{item.status}</td>
                    <td><button key={item.courseid} onClick={()=>{
                        const email = item.email;
                        console.log(email);
                        const {courseid} = this.state;
                        axios.post('http://localhost:3001/drop', {email, courseid}, {headers: {'Authorization': localStorage.getItem('authToken')}})
                        .then(res=>{
                            if(res){
                                
                                alert('Successfully Removed');
                                window.location.reload();   
                            }
                            
                        });
                    }}>Remove</button></td>
                    
                </tr>
               
            )
        })


        let detailsWL = this.state.itemsWL.map(item => {
            return(
                
                <tr key={item.courseid}>
                    <td>{item.name}</td> 
                    <td>{item.email}</td>
                    <td>{item.status}</td>
                    <td><button key={item.courseid} onClick={()=>{
                        const email = item.email;
                        console.log(email);
                        const {courseid} = this.state;
                        axios.post('http://localhost:3001/generateCode', {email, courseid}, {headers: {'Authorization': localStorage.getItem('authToken')}})
                        .then(res=>{
                            if(res){
                                
                                alert('Successfully Generated');
                                   
                            }
                            
                        });
                    }}>Generate</button></td>
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
                <div>
                    <Course/>
                </div>
                {/* <Redirect to="/dropp"/> */}
                <div style={{display: 'inline-block'}}>
                    <h2>View Students</h2>
                    <h5>{this.state.email}</h5>
                    <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Status</th>
                                    <th>Remove</th>
                                    
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
                    <button onClick={this.prvHandler} name="prev" id="prev">&lt;</button>
                    <button onClick={this.nxtHandler} name="prev" id="prev">&gt;</button>
                </div>
                     <br/><br/>           
                <div style={{display: 'inline-block'}}>
                    <h2>Waitlisted Students</h2>
                    <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Status</th>
                                    <th>Code</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* <Link to={{
                                    pathname: "/course",
                                    state: {courseid: details.courseid}
                                }}> {details}</Link>*/}
                                {detailsWL} 
                            </tbody>
                    </table>
                </div>
                
            </div>
        );
    }
}

export default ViewStudents;