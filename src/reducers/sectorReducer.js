import {GET_SECTORS, GET_SECTOR} from "../action/Types";

const initialState = {
    sectors: [],
    sector:{},
}

export default function(state = initialState, action) {
    switch(action.type){

        case GET_SECTORS:
            return {
                ...state,
                sectors: action.payload
            };

        case GET_SECTOR: 
           return {
               ...state,
               sector: action.payload
           }

        default: 
        return state;
    }
}