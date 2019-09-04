import { UPDETAILS } from '../actions/index';


export default function(state=[], action){
    
    switch(action.type){
        case UPDETAILS:
            return action.payload.user;
    }
    return state;
}