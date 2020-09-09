import {GET_DISTRICTS, GET_DISTRICT} from "../action/Types";

const initialState = {
    districts: [],
    district: {},
}

export default function(state = initialState, action){
    switch(action.type){

        case GET_DISTRICTS:
            return {
                ...state,
                districts: action.payload,
            };
        case GET_DISTRICT:
            return {
                ...state,
                district: action.payload,
                };
        default: 
        return state;
    }
}