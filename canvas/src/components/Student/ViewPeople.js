import React, {Component} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router';
import cookie from 'react-cookies';
import CourseStud from './CourseStud';


class ViewPeople extends Component{
    constructor(props){
        super(props);

        this.state={
            email: cookie.load('email'),
            courseid: cookie.load('courseid'),
            items: [],
            messageBox: '',
            message: '',
            sendButton: '',
            messageSent: '',
            page: 0,
            limit: 4
        }
        this.onChange = this.onChange.bind(this);
        this.nxtHandler = this.nxtHandler.bind(this);
        this.prvHandler = this.prvHandler.bind(this);
    }

    
    onChange(event){
        this.setState({
            message: event.target.value
        })
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
        // axios.get('http://localhost:3001/getStudents', {params: {courseid}, headers: {'Authorization': localStorage.getItem('authToken')}})
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
        
    }

    paginate(n){
        this.setState({
            page: this.state.page + n
        })
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
                    <td><button onClick={()=>this.setState({
                        messageBox: <textarea name="message" id="message" value={this.state.value} onChange={this.onChange} placeholder="Message"/>,
                        messageSent: '',
                        sendButton: <button onClick={()=>{
                            const {message} = this.state;
                            const emailSender = this.state.email;
                            const emailReceiver = item.email;
                            axios.post('http://localhost:3001/sendMessage', {message, emailSender, emailReceiver}, {headers: {'Authorization': localStorage.getItem('authToken')}})
                            .then(res=>{
                                console.log('Message Sent');
                                
                                this.setState({
                                    messageBox: '',
                                    sendButton: '',
                                    messageSent: 'Your message has been sent'
                                })
                            })
                        }}>Send</button>
                    })}>Message</button></td>

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
                <div><CourseStud/></div>
                {/* <Redirect to="/dropp"/> */}
                <div style={{display: 'inline-block'}}>
                <h2>View Students</h2>
                <h5>{this.state.email}</h5>
                <table>
                            <thead>
                                
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Message</th>
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
            <div>
                <br/>
                {this.state.messageBox}
                <br/>
                {this.state.sendButton}
                <br/>
                <p style={{WebkitTextFillColor: 'green'}}>{this.state.messageSent}</p>
            </div>
            <br/>
            <button onClick={()=>this.setState({
                        messageBox: <textarea name="message" id="message" value={this.state.value} onChange={this.onChange} placeholder="Message"/>,
                        messageSent: '',
                        sendButton: <button onClick={()=>{
                            const {message} = this.state;
                            const emailSender = this.state.email;
                            const {courseid} = this.state;
                            axios.post('http://localhost:3001/sendMessageF', {message, emailSender, courseid}, {headers: {'Authorization': localStorage.getItem('authToken')}})
                            .then(res=>{
                                console.log('Message Sent');
                                
                                this.setState({
                                    messageBox: '',
                                    sendButton: '',
                                    messageSent: 'Your message has been sent'
                                })
                            })
                        }}>Send</button>
                    })}>Message Faculty</button>
            </div>
        );
    }
}

export default ViewPeople;