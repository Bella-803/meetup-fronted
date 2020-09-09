import {GET_CREATED_GROUP} from "../action/Types";

const initialState = {
    ownedGroups: [],
}

export default function(state = initialState, action){

    switch(action.type){

        case GET_CREATED_GROUP: 
        return {
            ...state,
            ownedGroups: action.payload,
        };

        default: 
        return state;
    }
}