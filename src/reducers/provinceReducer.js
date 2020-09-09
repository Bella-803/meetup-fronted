import {GET_PROVINCES, GET_PROVINCE} from "../action/Types";

const initialState = {
    provinces: [],
    province: {},
}

export default function(state = initialState, action){
    switch(action.type) {

        case GET_PROVINCES: 
          return {
              ...state,
              provinces: action.payload,
          };

        case GET_PROVINCE: 
          return {
              ...state,
              province: action.payload,
          };
          
        default: 
        return state;
    }
}