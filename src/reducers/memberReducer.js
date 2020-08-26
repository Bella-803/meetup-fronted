import {GET_MEMBERS, GET_MEMBER} from "../action/Types";

const initialState = {
    members: [],
    member: {},
}

export default function(state = initialState, action){
    switch(action.type){

        case GET_MEMBERS : 
           return {
                ...state,
                members: action.payload,
            };
            case GET_MEMBER : 
            return {
                ...state,
                member : action.payload,
            };
            default : 
            return state;

    }
}