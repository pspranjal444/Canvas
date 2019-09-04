import {FETCH_MSGF} from '../actions/index';

export default function(state={}, action){
    console.log(action.payload);
    switch(action.type){
        case FETCH_MSGF:
            return action.payload;
        default: 
            return state;
    }
    
}