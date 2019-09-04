import { INV_LOG } from '../actions/index';

export default function(state=null, action){
    switch(action.type){
        case INV_LOG:
            return action.payload;
    }
    return state;
}