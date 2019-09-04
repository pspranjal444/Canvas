import React, {Component} from 'react';
import axios from 'axios';
import Stu_dashboard from './stu_dashboard';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import Axios from 'axios';


class Enroll extends Component{
    constructor(props){
        super(props);

        this.state={
            email: cookie.load('email'),
            items: [],
            codes: [],
            code: '',
            category: '',
            categoryVal: '',
            selectVal: ''
        }
        this.onClick = this.onClick.bind(this);
        this.onChange = this.onChange.bind(this);
        this.categorySelect = this.categorySelect.bind(this);
        this.searchHandler = this.searchHandler.bind(this);
    }

    onClick(){
        const {email, code} = this.state;
        
        axios.post('http://localhost:3001/codeEnroll', {email, code}, {headers: {'Authorization': localStorage.getItem('authToken')}})
        .then(res=>{
            alert('Successfully Enrolled');
        })
    }

    onChange(event){
        this.setState({
            code: event.target.value
        })
    }

    searchHandler(){
        this.setState({
            items: []
        })
        const {category, categoryVal, selectVal} = this.state;
        Axios.get('http://localhost:3001/getCoSea', {params:{category, categoryVal, selectVal}, headers: {'Authorization': localStorage.getItem('authToken')}})
        .then(res=>{
            
                this.setState({
                    items: this.state.items.concat(res.data)
                })
            
        });
    }

    

    categorySelect(event){
        this.setState({
            category: event.target.name,
            categoryVal: event.target.value
        })
    }
    
    componentDidMount(){
        
        const {email} = this.state;

        // axios.get('http://localhost:3001/getcoursesfd')
        // .then(res=>{
        //     // console.log(res.data);
        //     this.setState({
        //         items: this.state.items.concat(res.data)
        //     })
            
        // });

        axios.get('http://localhost:3001/getCodes', {params: {email}, headers: {'Authorization': localStorage.getItem('authToken')}})
        .then(resp => {
            this.setState({
                codes: this.state.codes.concat(resp.data)
            })
            
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
                    <td>{item.courseid}</td> 
                    <td>{item.coursename}</td>
                    <td>{item.coursecapc}</td>
                    <td>{item.wlcapc}</td>
                    <td><button key={item.courseid} onClick={()=>{
                        const {email} = this.state;
                        const courseid = item.courseid;
                        axios.post('http://localhost:3001/enroll', {email, courseid}, {headers: {'Authorization': localStorage.getItem('authToken')}})
                        .then(res=>{
                            if(res.data === true){
                                alert('Successfully Enrolled');
                                // window.location.reload();
                            }
                            else{
                                alert('You are already enrolled in this course');
                            }
                        });
                    }}>Enroll</button></td>
                    <td><button key={item.courseid} onClick={()=>{
                        const {email} = this.state;
                        const courseid = item.courseid;
                        axios.post('http://localhost:3001/waitlist', {email, courseid}, {headers: {'Authorization': localStorage.getItem('authToken')}})
                        .then(res=>{
                            if(res.data === true){
                                alert('Successfully Waitlisted');
                            }
                            else{
                                alert('Please enroll in regular session or either the waitlist is full');
                            }
                        });
                    }}>Waitlist</button></td>
                    
                </tr>
               
            )
        })

        let codeDetails = this.state.codes.map(codeL=>{
            return(
                <tr key={codeL.courseid}>
                    <td>{codeL.courseid}</td>
                    <td>{codeL.code}</td>
                </tr>
            );
            
        })
        return(
            <div>
                {redirectVar}
                <div><Stu_dashboard/></div>
                <div style={{display: 'inline-block'}}>
                <h2>Enroll/Waitlist Courses</h2>
                <div style={{height: '50px', width: '675px', backgroundColor: 'rgba(220, 20, 60, 0.15)'}}>
                    <p style={{WebkitTextFillColor: 'red'}}>Currently the system supports search courses with course no. in multiples of 100. For eg 201, 215, etc will not work. But 100, 200, 300, etc. will work fine</p>
                </div>
                <br/>
                <table align="center">
                    <tr>
                        <td align="left"><label>Course Number</label></td>
                        <td align="left">
                            <select name="cno_category" onChange={this.categorySelect} value={this.state.value}>
                                <option value="isSelected" hidden>Select</option>
                                <option value=">">greater than</option>
                                <option value="<">less than</option>
                                <option value="=">is exactly</option>
                            </select>
                        </td>
                        <td align="left"><input name="cno_input" onChange={(e)=>this.setState({
                            selectVal: e.target.value
                        })} type="text"></input></td>
                        <td align="left"><button onClick={this.searchHandler}>Search</button></td>
                    </tr>
                        
                    <tr>
                        <td align="left"><label>Course Name</label></td>
                        <td align="left">
                            <select name="cname_category" onChange={this.categorySelect} value={this.state.value}>
                                <option value="isSelected" hidden>Select</option>
                                <option value="like">contains</option>
                                <option value="=">is exactly</option>
                            </select>
                        </td>
                        <td align="left"><input name="cno_input" onChange={(e)=>this.setState({
                            selectVal: e.target.value
                        })} type="text"></input></td>
                        <td align="left"><button onClick={this.searchHandler}>Search</button></td>
                    </tr>

                    <tr>
                        <td align="left"><label>Term</label></td>
                        <td align="left">
                            <select name="term" onChange={this.categorySelect} value={this.state.value}>
                                <option value="isSelected" hidden>Select</option>
                                <option value="SP19">SP19</option>
                                <option value="FA19">FA19</option>
                            </select>
                        </td>
                        <td>SP19: Spring 2019<br/>FA19: Fall 2019</td>
                        <td align="left"><button onClick={this.searchHandler}>Search</button></td>
                    </tr>
                </table>
                <br/>
                <h3>Courses Offered</h3>
                <table style={{textAlign: "center"}}>
                            <thead>
                                <tr>
                                    <th>Course ID</th>
                                    <th>Course Name</th>
                                    <th>Capacity</th>
                                    <th>Waitlist Capacity</th>
                                    <th>Enroll</th>
                                    <th>Waitlist</th>
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
                <div>
                    <h3>View Codes</h3>
                    <div style={{display: 'inline-block'}}>
                    <table style={{textAlign: "center"}}>
                            <thead>
                                <tr>
                                    <th>Course ID</th>
                                    <th>Code</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* <Link to={{
                                    pathname: "/course",
                                    state: {courseid: details.courseid}
                                }}> {details}</Link>*/}
                                {codeDetails} 
                            </tbody>
                    </table>
                    </div>
                </div>
                <div style={{display: 'inline-block'}}>
                    <input type="text" value={this.state.value} onChange={this.onChange} name="code" placeholder="Code..."/>
                    <button value="Enroll" onClick={this.onClick}>Enroll</button>
                </div>
            </div>
        );
    }
}

export default Enroll;