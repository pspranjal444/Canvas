import {FETCH_MSG} from '../actions/index';

export default function(state={}, action){
    console.log(action.payload);
    switch(action.type){
        case FETCH_MSG:
            return action.payload;
        default: 
            return state;
    }
    
}