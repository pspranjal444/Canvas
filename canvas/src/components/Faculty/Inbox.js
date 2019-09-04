import React, { Component } from 'react';
import cookie from 'react-cookies';
import Axios from 'axios';
import Course from './Course';
import {connect} from 'react-redux';


class InboxF extends Component {
    constructor(props){
        super(props);
        this.state = {
            courseid: cookie.load('courseid')
        }
    }

    // componentDidMount(){
    //     const {courseid} = this.state;
    //     Axios.get('http://localhost:3001/getMessagesF', {params: {courseid}})
    //     .then(result=>{
    //         this.setState({
    //             items: this.state.items.concat(result.data)
    //         })
    //     })
    // }

    

    render(){
        let details = this.props.msgsF.map(item => {
            return(
                
                <tr key={item._id}>
                    <td>{item.emailSender}</td> 
                    <td>{item.message}</td>
                </tr>
            )
        })
        return (
            <div>
                <div>
                    <Course/>
                </div>
                <div style={{display: 'inline-block'}}>
                <h2>Inbox</h2>
                    <table>
                            <thead>
                                <tr>
                                    <th>Sender</th>
                                    <th>Message</th>
                                    
                                    
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

function mapStateToProps(state){
    return {
        msgsF: state.msgsF
    }
}

export default connect(mapStateToProps)(InboxF);