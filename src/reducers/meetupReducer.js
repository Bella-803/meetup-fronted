import { GET_MEETUPS, GET_MEETUP, DELETE_MEETUP } from "../action/Types";

const initialState = {
  meetups: [],
  meetup: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_MEETUPS:
      return {
        ...state,
        meetups: action.payload,
      };

    case GET_MEETUP:
      return {
        ...state,
        meetup: action.payload,
      };

    case DELETE_MEETUP:
      return {
        ...state,
        meetups: state.meetups.filter((meetup) => meetup.id !== action.payload),
      };

    default:
      return state;
  }
}
