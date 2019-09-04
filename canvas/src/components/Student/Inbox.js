import React, { Component } from 'react';
import cookie from 'react-cookies';
import Axios from 'axios';
import Stu_dashboard from './stu_dashboard';
import {connect} from 'react-redux';
import { bindActionCreators } from 'C:/Users/User/AppData/Local/Microsoft/TypeScript/3.2/node_modules/redux';
import {fetchMessages} from '../../actions/index';

class Inbox extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: cookie.load('email'),
            items: []
        }
    }

    // componentDidMount(){
    //     const {email} = this.state;
    //     Axios.get('http://localhost:3001/getMessages', {params: {email}})
    //     .then(result=>{
    //         this.setState({
    //             items: this.state.items.concat(result.data)
    //         })
    //     })
    // }

    render(){
        let details = this.props.msgs.map(item => {
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
                    <Stu_dashboard/>
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
        msgs: state.msgs
    }
}



export default connect(mapStateToProps)(Inbox);