import {NUMBER_CATEGORIES, NUMBER_USERS, NUMBER_GROUPS, NUMBER_MEETUPS} from "../action/Types";


const initialState = {
    numberOfCategories : 0,
    numberOfUsers : 0,
    numberOfGroups: 0,
    numberOfMeetups: 0,
}

export default function(state = initialState, action) {
    switch(action.type) {

        case NUMBER_CATEGORIES: 
            return {
            ...state,
            numberOfCategories: action.payload,
        };

        case NUMBER_USERS:
            return {
                ...state,
                numberOfUsers: action.payload,
            };
        case NUMBER_GROUPS: 
            return {
                ...state,
                numberOfGroups: action.payload
            }
        case NUMBER_MEETUPS:
            return {
                ...state,
                numberOfMeetups: action.payload,
            }

        default :
        return state;
    }
}