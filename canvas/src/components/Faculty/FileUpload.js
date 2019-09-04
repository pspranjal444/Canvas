import React, {Component} from 'react';
import cookie from 'react-cookies';
import Axios from 'axios';
import Course from './Course';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router';
// import {Document} from 'react-pdf';
// import { Document, Page, setOptions } from 'react-pdf';
// setOptions({ workerSrc: '/public/pdf.worker.min.js', });
// import spdf from "simple-react-pdf";

class FileUpload extends Component{
    constructor(props){
        super(props);

        this.state={
            file: null,
            email: cookie.load('email'),
            courseid: cookie.load('courseid'),
            filelinks: [],
            fileRec: '',
            numPages: null,
            pageNumber: 1,
            close: ''
        }

        this.onChange = this.onChange.bind(this);
        // this.onLoadSuccess = this.onDocumentLoadSuccess.bind(this);
    }

    onChange(event){
        console.log(event.target.files[0])
        this.setState({
            file: event.target.files[0]
        })
    }

    uploadFile(){
        const data = new FormData();
        const {email, courseid} = this.state;
        data.set('email', email);
        data.set('courseid', courseid);
        data.append('file', this.state.file, this.state.file.filename);
        // const {file} = this.state;
        
        
        console.log(email);
        console.log(courseid);
        Axios.post('http://localhost:3001/fileUpload', data, {email, courseid})
        .then(res=>{
            console.log('File Uploaded Successfully');
            alert('File Uploaded Successfully');
        })
    }

    componentDidMount(){
        const {email, courseid} = this.state;
        Axios.get('http://localhost:3001/getFileLinks', {params: {email, courseid}, headers: {'Authorization': localStorage.getItem('authToken')}})
        .then(res => {
            this.setState({
                filelinks: this.state.filelinks.concat(res.data)
            })
        })
    }

    // componentDidMount(){
    //     // const {email, courseid} = this.state;
    //     const filename = 'HP.pdf';
    //     Axios.get('http://localhost:3001/getFile', {params: {filename}})
    //     .then(res => {
    //         this.setState({
    //             fileRec: res.data
    //         })
    //     })
    // }

    // onDocumentLoadSuccess({ numPages }){
    //     this.setState({ numPages });
    // }


    render(){
        let redirectVar = null;
        if(!(cookie.load('email'))){
            redirectVar = <Redirect to='/'/>
        }
        let details = this.state.filelinks.map(fn => {
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
                    <Course/>
                </div>

                <div style={{display: 'inline-block'}}>
                <h2>File Upload</h2>
                
                <input type="file" onChange={this.onChange} name="file" id="file"/>
                <button onClick={this.uploadFile.bind(this)}>Upload</button>
                
                <h3>Files</h3>
                <div style={{display: 'inline-block'}}>
                    <table>
                        <thead>
                            <th>File Name</th>
                        </thead>
                        <tbody>
                            {details}
                        </tbody>
                    </table>
                </div>
                {/* <p>{this.state.fileRec}</p> */}
                {/* <embed src="http://localhost:3001/" type="application/pdf" width="100%" height="600px" /> */}
                {/* <spdf.SimplePDF file={this.state.fileRec}/> */}
                {/* <img src={this.state.fileRec} alt="IMAGE"/> */}
                <br/>
                {/* <embed src={this.state.fileRec} type="application/pdf" width="500px" height="400px"/> */}
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
            </div>
        );
    }
}

export default FileUpload;