import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import Draggable from 'react-draggable';
import {connect} from 'react-redux';
import {fetchMessagesF} from '../../actions/index';
import { bindActionCreators } from 'C:/Users/User/AppData/Local/Microsoft/TypeScript/3.2/node_modules/redux';


class CourseCard extends Component{
    constructor(props){
        super(props);

        this.state={
            courseid: this.props.courseid,
            coursename: this.props.coursename,
            email: this.props.email
        }
        this.onClick = this.onClick.bind(this);
    }

    onClick(){
        cookie.save('courseid', this.state.courseid);
        cookie.save('coursename', this.state.coursename);
        this.props.fetchMessagesF(this.state.courseid);
    }

    render(){
        // cookie.save('coursename', this.state.coursename);
        // cookie.save('courseid', this.state.courseid);
        // cookie.save('email', this.state.email)
        let redirectVar = null;
        if(!(cookie.load('email'))){
            redirectVar = <Redirect to='/'/>
        }
        return(
            <div style={{display: 'inline-block', marginLeft: '30px'}}>
            {redirectVar}
            <Draggable>
                <div className="cardLayout">
                    <p style={{fontSize: '25px'}}>{this.props.coursename}</p>
                    <button onClick={this.onClick} className="buttonCourseCard"><Link onClick={this.onClick} style={{backgroundColor: '#0055A2', fontSize: '20px', WebkitTextFillColor: 'white', textDecorationColor: '#0055A2'}} to={{pathname: "/course",
                                    state: {courseid: this.state.courseid, coursename: this.state.coursename, email: this.state.email}}}>{this.state.courseid}</Link></button> 
                </div> 
            </Draggable>
            </div>
                       
        );
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({fetchMessagesF: fetchMessagesF}, dispatch);
}

export default connect(null, mapDispatchToProps)(CourseCard);