import {GET_MEMBERS, GET_MEMBER, DELETE_USER} from "../action/Types";

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
            case DELETE_USER : 
            return {
                ...state,
                members: state.members.filter(member => member.id !== action.payload),
            };
            default : 
            return state;

    }
}