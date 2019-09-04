import React, {Component} from 'react';
import Axios from 'axios';
import cookie from 'react-cookies';
import Stu_dashboard from './stu_dashboard';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';
import { bindActionCreators } from 'C:/Users/User/AppData/Local/Microsoft/TypeScript/3.2/node_modules/redux';
import {fetchStudent} from '../../actions/index';
import {setUpdateDetails} from '../../actions/index';


class UpdateProfileS extends Component{
    constructor(props){
        super(props);
        this.state={
            email: cookie.load('email'),
            name:'',
            password: '',
            phone: '',
            about: '',
            city: '',
            country: '',
            company: '',
            school: '',
            hometown: '',
            languages: '',
            gender: '',
            imgfile: null,
            imprev: '',
            imglink: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'  
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onImageChange = this.onImageChange.bind(this);
    }

    onChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    // componentDidMount(){
    //     const {email} = this.state;
    //     Axios.get('http://localhost:3001/getProfileS', {params: {email}})
    //     .then(res=>{
    //         console.log(res.data);
    //         res.data.map(item => {
    //             this.setState({
    //                 name: item.name,
    //                 phone: item.phone,
    //                 about: item.about,
    //                 city: item.city,
    //                 country: item.country,
    //                 company: item.company,
    //                 school: item.school,
    //                 hometown: item.hometown,
    //                 languages: item.languages,
    //                 gender: item.gender,
    //                 imglink: item.imglink
    //             })
    //         })
    //     });
    // }

    componentDidMount(){
        
            this.props.studentData.map(item => {
                this.setState({
                    name: item.name,
                    phone: item.phone,
                    about: item.about,
                    city: item.city,
                    country: item.country,
                    company: item.company,
                    school: item.school,
                    hometown: item.hometown,
                    languages: item.languages,
                    gender: item.gender,
                    imglink: item.imglink
                })
            })
    
    }

    onSubmit(event){
        event.preventDefault();
        const {email, name, password, phone, about, city, country, company, school, hometown, languages, gender} = this.state;
        console.log(email);
        const data = { 
            name: this.state.name, 
            password: this.state.password, 
            phone: this.state.phone, 
            about: this.state.about, 
            city: this.state.city, 
            country: this.state.country, 
            company: this.state.company, 
            school: this.state.school, 
            hometown: this.state.hometown, 
            languages: this.state.langauges, 
            gender: this.state.gender
        }
        Axios.post('http://localhost:3001/updateProfileS', {email, name, password, phone, about, city, country, company, school, hometown, languages, gender}, {headers: {'Authorization': localStorage.getItem('authToken')}})
        .then(res => {
            this.props.setUpdateDetails(data);
            this.props.fetchStudent(email);
            console.log('Profile Updated');
            alert('Profile Updated');
            
        });
    }

    onClick(){
        const data = new FormData();
        const {email} = this.state;
        data.set('email', email);
      
        data.append('file', this.state.imgfile, this.state.imgfile.filename);
        // const {file} = this.state;
        
        
        console.log(email);
        
        Axios.post('http://localhost:3001/imageUploadS', data, {email})
        .then(res=>{
            const {imprev} = this.state;
            this.setState({
                imglink: imprev
            });

            this.props.fetchStudent(email);
            console.log('Image Uploaded Successfully');
            alert('Image Uploaded Successfully');
           
        })
    }

    

    onImageChange(event){
        this.setState({
            imgfile: event.target.files[0],
            imprev: URL.createObjectURL(event.target.files[0])
        })
    }

    render(){
        let redirectVar = null;
        if(!(cookie.load('email'))){
            redirectVar = <Redirect to='/'/>
        }
        return(
            <div>
                {redirectVar}
                <div>
                    <Stu_dashboard/>
                </div>

                <div style={{float: 'left', marginLeft: '100px'}}>
                    <br/>
                    <img style={{width: '80px', height: '80px', borderRadius: '60px'}} src={this.state.imglink}/><br/>
                    <input type="file" name="imgfile" id="imgfile" onChange={this.onImageChange}/><br/>
                    <button onClick={this.onClick}>Upload</button>
                </div>

                <div style={{display: 'inline-block', marginLeft: '-300px'}}>
                <h2>Update Details</h2>
                <form onSubmit={this.onSubmit}>
                    <input type="text" value={this.state.name} onChange={this.onChange} name="name" id="name" placeholder="Name"/><br/><br/>
                    <input type="password" value={this.state.value} onChange={this.onChange} name="password" id="password" placeholder="Password"/><br/><br/>
                    <input type="text" value={this.state.phone} onChange={this.onChange} name="phone" id="phone" placeholder="(xxx) xxx-xxxx"/><br/><br/>
                    <input type="text" value={this.state.about} onChange={this.onChange} name="about" id="about" placeholder="About"/><br/><br/>
                    <input type="text" value={this.state.city} onChange={this.onChange} name="city" id="city" placeholder="City"/><br/><br/>
                    <input type="text" value={this.state.country} onChange={this.onChange} name="country" id="country" placeholder="Country"/><br/><br/>
                    <input type="text" value={this.state.company} onChange={this.onChange} name="company" id="company" placeholder="Company"/><br/><br/>
                    <input type="text" value={this.state.school} onChange={this.onChange} name="school" id="school" placeholder="School"/><br/><br/>
                    <input type="text" value={this.state.hometown} onChange={this.onChange} name="hometown" id="hometown" placeholder="Hometown"/><br/><br/>
                    <input type="text" value={this.state.languages} onChange={this.onChange} name="languages" id="languages" placeholder="Languages"/><br/><br/>
                    <input type="text" value={this.state.gender} onChange={this.onChange} name="gender" id="gender" placeholder="Gender"/><br/><br/>
                    <input type="submit" value="Update"/>
                </form>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        studentData: state.studentData,
        updetails: state.updetails
    };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({fetchStudent: fetchStudent, setUpdateDetails: setUpdateDetails}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfileS);