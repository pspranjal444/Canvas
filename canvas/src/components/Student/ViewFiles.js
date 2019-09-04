import React, {Component} from 'react';
import cookie from 'react-cookies';
import Axios from 'axios';
import {Redirect} from 'react-router';
import CourseStud from './CourseStud';

class ViewFiles extends Component{
    constructor(props){
        super(props);

        this.state={
            courseid: cookie.load('courseid'),
            details: []
        }
    }

    componentDidMount(){
        const {email, courseid} = this.state;
        Axios.get('http://localhost:3001/getFileLinksForS', {params: {email, courseid}, headers: {'Authorization': localStorage.getItem('authToken')}})
        .then(res => {
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
        let display = this.state.details.map(fn => {
            return(
                <tr key={fn.filename}>
                <td><a style={{WebkitTextFillColor: '#0055A2', textDecoration: 'underline', cursor: 'pointer'}} onClick={()=>{
                    cookie.save('filename', fn.filename);
                    const {email, courseid} = this.state;
                    const {filename} = fn;
                    console.log(fn.fileLocation);
                    // window.open(fn.fileLocation);
                    this.setState({
                        fileRec: <embed src={fn.fileLocation} type="application/pdf" width="800px" height="800px"/>,
                        close: 'CLOSE(X)'
                    })
                }}>{fn.filename}</a></td>
                </tr>
            );
            
        });

        return(
            <div>
                {redirectVar}
                <div>
                    <CourseStud/>
                </div>
                <h3>Files</h3>
                <div style={{display: 'inline-block'}}>
                    <table>
                        <thead>
                            <th>File Name</th>
                        </thead>
                        <tbody>
                            {display}
                        </tbody>
                    </table>
                </div>
                <div>
                    <a style={{WebkitTextFillColor: 'red', textDecoration: 'underline', cursor: 'pointer'}} onClick={()=>{
                        this.setState({
                            fileRec: '',
                            close: ''
                        })
                    }}>{this.state.close}</a>
                    <br/>
                    {this.state.fileRec}
                </div>
            </div>
        )
    }
}

export default ViewFiles;