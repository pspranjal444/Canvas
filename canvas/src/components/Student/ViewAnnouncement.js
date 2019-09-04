import React, { Component } from "react";
import cookie from "react-cookies";
import AnnouncementCard from './AnnouncementCard';
import Axios from 'axios';
import CourseStud from './CourseStud';
import {Redirect} from 'react-router';


class ViewAnnouncement extends Component{
    constructor(props){
        super(props);

        this.state={
            items: [],
            courseid: cookie.load('courseid')
        }
    }

    componentDidMount(){
        const {courseid} = this.state;
        Axios.get('http://localhost:3001/getanncn', {params: {courseid}, headers: {'Authorization': localStorage.getItem('authToken')}})
        .then(res=>{
            this.setState({
                items: this.state.items.concat(res.data)
            })
        })
    }

    render(){
        let redirectVar = null;
        if(!(cookie.load('email'))){
            redirectVar = <Redirect to='/'/>
        }
        var details = this.state.items.map(item=>{
            return(
                <AnnouncementCard annName={item.name} annDesc={item.descp}/>
            )
            
        });

        return(
            <div>
                {redirectVar}
                <div>
                    <CourseStud/>
                </div>
                
                <div style={{display: 'inline'}}>
                    <h3>Announcements</h3>
                    {details}
                </div>
                
            </div>
        )
    }

}

export default ViewAnnouncement;