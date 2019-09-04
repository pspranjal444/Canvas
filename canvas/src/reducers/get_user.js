import { AUTH } from '../actions/index';
// import { INV_LOG } from '../actions/index';


export default function(state=null, action){
    switch(action.type){
        case AUTH:
            return action.payload;
    }
    return state;
}