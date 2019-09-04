import React, {Component} from 'react';
import Axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';


class AssignmentCard extends Component{
    constructor(props){
        super(props);

        this.state = {
            name: this.props.name,
            email: cookie.load('email'),
            courseid: cookie.load('courseid'),
            link: ' ',
            file: null
        }
        this.onClick = this.onClick.bind(this);
    }

    onClick(){
        const data = new FormData();
        const {name, email, courseid, link} = this.state;
        data.set('name', name);
        data.set('email', email);
        data.set('courseid', courseid);
        data.set('link', link);
        data.append('file', this.state.file, this.state.file.filename);
        Axios.post('http://localhost:3001/submitAssignment', data, {name, email, courseid, link})
        .then(res=>{
            console.log('Assignment Submitted Successfully');
            alert('Assignment Submitted Successfully');
        });
    }

    fileChange(event){
        console.log(event.target.files[0])
        this.setState({
            file: event.target.files[0]
        })
    }
    
    textChange(event){
        this.setState({
            link: event.target.value
        })
    }
    
    render(){
        let redirectVar = null;
        if(!(cookie.load('email'))){
            redirectVar = <Redirect to='/'/>
        }
        return(
            <div className="cardLayoutAnncn" style={{display: 'inline-block', borderLeft: '5px solid #0055A2'}}>
            {redirectVar}
                <h3 style={{textAlign: 'left'}}>{this.props.name}</h3>
                <p style={{height: 'auto', width: '796px', backgroundColor: '#d8d5d5', textAlign: 'left', borderRadius: '5px', padding: '6px'}}><i>{this.props.descp}</i></p>
                <input style={{float: 'left'}} onChange={this.fileChange.bind(this)} type="file" name="file" id="file"/>
                <input style={{float: 'left'}} onChange={this.textChange.bind(this)} type="text" name="link" id="link" placeholder="Submit Link Here"/>
                <button style={{float: 'right'}} onClick={this.onClick}>Submit</button>
            </div>
        );
    }
}

export default AssignmentCard;