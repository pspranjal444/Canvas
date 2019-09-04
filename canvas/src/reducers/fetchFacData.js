import { FETCH_FAC } from '../actions/index';
// import { INV_LOG } from '../actions/index';


export default function(state={}, action){
    console.log(action.payload);
    switch(action.type){
        case FETCH_FAC:
            return action.payload;
        default: 
            return state;
    }
    
}