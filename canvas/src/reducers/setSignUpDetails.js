import { SGUPDETAILS } from '../actions/index';


export default function(state=[], action){
    
    switch(action.type){
        case SGUPDETAILS:
            return action.payload.user;
    }
    return state;
}