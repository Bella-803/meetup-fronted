import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import categoryReducer from "./categoryReducer";
import groupReducer from "./groupReducer";
import meetupReducer from "./meetupReducer";
import memberReducer from "./memberReducer";
import securityReducer from "./securityReducer";
import userReducer from "./userReducer";
import adminReducer from "./adminReducer";
import sectorReducer from "./sectorReducer";
import provinceReducer from "./provinceReducer";
import districtReducer from "./districtReducer";

export default combineReducers({
  errors: errorReducer,
  category: categoryReducer,
  group: groupReducer,
  meetup: meetupReducer,
  member: memberReducer,
  user: userReducer,
  security: securityReducer,
  admin: adminReducer,
  province: provinceReducer,
  district: districtReducer,
  sector: sectorReducer,
});
