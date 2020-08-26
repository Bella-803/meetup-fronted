import React from "react";
import store from "./store";
import { Provider } from "react-redux";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./Component/header/header";
import AdminDashboard from "./Component/Dashboard/Admin_Dashboard";
import AdminDashboardCategory from "./Component/Dashboard/Admin_Dashboard_Category";
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
import AdminDashboardUsers from "./Component/Dashboard/Admin_Dashboard_Users";
import setJWTToken from "./securityUtils/setJWTToken";
import SecuredRoute from "./securityUtils/secureRoute";
import jwt_decode from "jwt-decode";
import {logout} from "./action/securityAction";
import {SET_CURRENT_USER} from "./action/Types";
import Home from "./Component/home/home";
import MainDashboard from "./Component/Dashboard/main-dashboard";


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
          <SecuredRoute exact path="/admin" component={AdminDashboard} />
          <SecuredRoute exact path="/admin-dashboard-users" component={AdminDashboardUsers} />
          <SecuredRoute
            exacts
            path="/adminDashboardCategory"
            component={AdminDashboardCategory}
          />
          <SecuredRoute exact path="/updateCategory/:id" component={UpdateCategory} />
         
          <SecuredRoute
            exact
            path="/showcategoryitem/:catId"
            component={CategoryItemUserView}
          />
          <SecuredRoute exact path="/addGroup/:catId" component={AddGroupForm} />
          <SecuredRoute exact path="/updateGroup/:catId/:groupId" component={UpdateGroupForm} />
          <SecuredRoute
            exact
            path="/groupadmindashboard/:catId"
            component={GroupAdminDashboard}
          />
          <SecuredRoute
            exact
            path="/groupadminexploredetails/:catId/:groupId"
            component={GroupAdminExploreDetails}
          />
         <SecuredRoute exact path="/updatemeeting/:groupId/:meetupId" component={UpdateMeeting} />
         <SecuredRoute exact path="/members/:categoryId/:groupId" component={Members} />
         <SecuredRoute exact path="/groupitemcontentuserview/:groupId" component={GroupItemContentView}/>

         </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
