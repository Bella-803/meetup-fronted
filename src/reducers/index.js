import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import categoryReducer from "./categoryReducer";
import groupReducer from "./groupReducer";
import meetupReducer from "./meetupReducer";
import memberReducer from "./memberReducer";
import securityReducer from "./securityReducer";

export default combineReducers({
  errors: errorReducer,
  category: categoryReducer,
  group: groupReducer,
  meetup: meetupReducer,
  member: memberReducer,
  security: securityReducer
});
