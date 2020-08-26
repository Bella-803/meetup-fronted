import { GET_GROUPS, GET_GROUP, DELETE_GROUP } from "../action/Types";

const initialState = {
  groups: [],
  group: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_GROUPS:
      return {
        ...state,
        groups: action.payload,
      };

    case GET_GROUP:
      return {
        ...state,
        group: action.payload,
      };

    case DELETE_GROUP:
      return {
        ...state,
        groups: state.groups.filter((group) => group.id !== action.payload),
      };
    default:
      return state;
  }
}
