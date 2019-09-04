import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Signin from './Signin';
import Signup from './Signup';
class Main extends Component{
    constructor(){
        super();
    }

    render(){
        return(
        
            <div>
               <Route path='/' component={Signin}/>
               <Route exact path='/signup' component={Signup}/> 
            </div>
        );
    }
}

export default Main;