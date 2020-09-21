import React from "react";
import store from "./store";
import { Provider } from "react-redux";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./Component/header/header";
import UpdateCategory from "./Component/Category/UpdateCategory";
import Landing from "./Component/home/landing";
import AddGroupForm from "./Component/group/addGroupForm";
import CategoryItemUserView from "./Component/Category/category_item_user_view";
import GroupAdminDashboard from "./Component/Dashboard/group_admin_dashboard";
import GroupAdminExploreDetails from "./Component/Dashboard/group_admin_explore_details";
import Members from "./Component/Members/members";
import UpdateGroupForm from "./Component/group/updateGroupForm";
import UpdateMeeting from "./Component/Meetup/updateMeeting";
import GroupItemContentView from "./Component/group/group_item_content_view";
import Signup from "./Component/userManagement/signup";
import Login from "./Component/userManagement/login";
import setJWTToken from "./securityUtils/setJWTToken";
import SecuredRoute from "./securityUtils/secureRoute";
import jwt_decode from "jwt-decode";
import {logout} from "./action/securityAction";
import {SET_CURRENT_USER} from "./action/Types";
import Home from "./Component/home/home";
import MainAdminDashboard from "./Component/Dashboard/main_admin_dashboard";
import MainAdminDashboardUsers from "./Component/Dashboard/main_admin_dashboard_users";
import MainAdminDashboardCategory from "./Component/Dashboard/main_admin_dashboard_category";
import MainAdminDashboardGroups from "./Component/Dashboard/main-admin-dashboard-groups";
import MainAdminDashboardMeetup from "./Component/Dashboard/main_admin_dashboard_meetup";
import AddCategoryForm from "./Component/Category/AddCategoryForm";
import AccessDenied from "./Component/erroPage/accessDenied";
import MainAdminDashboardProfile from "./Component/Dashboard/main_admin_dashboard_profile";
import MainAdminDashboardProvince from "./Component/Dashboard/main_admin_dashboard_province";
import MainAdminDashboardDistrict from "./Component/Dashboard/main_admin_dashboard_district";
import MainAdminDashboardSector from "./Component/Dashboard/main_admin_dashboard_sector";
import MainAdminDashboardReport from "./Component/Dashboard/main_admin_dashboard_report";
import AddMeetingForm from "./Component/Meetup/addMeetingForm";
import UserProfile from "./Component/userManagement/userProfile";


const jwtToken = localStorage.jwtToken;

if(jwtToken){
  setJWTToken(jwtToken);
  const decoded_jwtToken = jwt_decode(jwtToken);
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decoded_jwtToken,
  })

  const currentTime = Date.now() / 1000;
  if(decoded_jwtToken.exp < currentTime) {
    store.dispatch(logout());
    window.location.href = "/";
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
         <Header />

         {
           //Public Route
         }

          <Route exact path="/" component={Landing} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login}/>
          {
            //Private Route
          }

          <Switch>

          <SecuredRoute exact path="/home" component={Home} />
          <SecuredRoute exact path="/user/profile" component={UserProfile} />
          <SecuredRoute exact path="/admin" component={MainAdminDashboard} />
          <SecuredRoute exact path="/admin-dashboard-users" component={MainAdminDashboardUsers} />
          <SecuredRoute exact path="/admin-dashboard-categories" component={MainAdminDashboardCategory} />
          <SecuredRoute exact path="/admin-dashboard-groups" component={MainAdminDashboardGroups} />
          <SecuredRoute exact path="/admin-dashboard-meetups" component={MainAdminDashboardMeetup} />
          <SecuredRoute exact path="/admin/profile" component={MainAdminDashboardProfile} />
          <SecuredRoute exact path="/admin/location/province" component={MainAdminDashboardProvince} />
          <SecuredRoute exact path="/admin/location/district" component={MainAdminDashboardDistrict} />
          <SecuredRoute exact path="/admin/location/sector" component={MainAdminDashboardSector} />
          <SecuredRoute exact path="/admin/report" component={MainAdminDashboardReport} />

          <SecuredRoute exact path="/add-category" component={AddCategoryForm} />
          <SecuredRoute exact path="/updateCategory/:id" component={UpdateCategory} />
          <SecuredRoute exact path="/showcategoryitem/:catId" component={CategoryItemUserView} />

          <SecuredRoute exact path="/addGroup/:catId" component={AddGroupForm} />
          <SecuredRoute exact path="/updateGroup/:catId/:groupId" component={UpdateGroupForm} />

          <SecuredRoute exact path="/groupadmindashboard/:groupId/:catId" component={GroupAdminDashboard} />
          <SecuredRoute exact path="/groupadminexploredetails/:catId/:groupId" component={GroupAdminExploreDetails} />
          
         <SecuredRoute exact path="/addmeeting/:groupId/:catId" component={AddMeetingForm} />
         <SecuredRoute exact path="/updatemeeting/:groupId/:meetupId" component={UpdateMeeting} />
         <SecuredRoute exact path="/members/:categoryId/:groupId" component={Members} />
         <SecuredRoute exact path="/groupitemcontentuserview/:groupId" component={GroupItemContentView}/>

         <SecuredRoute exact path="/access-denied" component={AccessDenied} />

         </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
