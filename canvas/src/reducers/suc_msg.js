import { SUC_SGUP } from '../actions/index';

export default function(state=null, action){
    switch(action.type){
        case SUC_SGUP:
            return action.payload;
    }
    return state;
}