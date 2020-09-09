import React, { Component } from "react";
import {Link} from "react-router-dom";
import logo from "../../images/ms_logo.png";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {logout} from "../../action/securityAction";
import {getAllCreatedGroup} from "../../action/userAction";


class Header extends Component {


  logout(){
    this.props.logout();
    window.location.href = "/"
  }

  render() {

     const {ownedGroups} = this.props.user;

    const groupLinks = ownedGroups.map(group => (
      <Link class="dropdown-item" to={`/groupadmindashboard/${group.id}/${group.category.id}`}> {group.groupName}</Link>
    ))

    const {validToken, user} = this.props.security;
   
    const userIsAuthenticated = (

      <nav class="navbar navbar-expand-sm navbar-light bg-white meetup-nav">
      <div class="container">
        <Link to="/" class="navbar-brand">
          <img src={logo} alt="logo" width="60" height="60"/>
        </Link>

        <button
          class="navbar-toggler"
          data-toggle="collapse"
          data-target="#navbarCollapse"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        
        <div id="navbarCollapse" class="collapse navbar-collapse">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <Link to="/home" class="nav-link">
              <i class="fas fa-user-circle mr-1">{user.fullname}</i>
            </Link>
          </li>
  
          <li class="nav-item">
            <Link to="/login" class="nav-link" onClick={this.logout.bind(this)}>
              Logout
            </Link>
          </li>
  
        </ul>
      </div>
       
      </div>
    </nav>

    
    );

    const userIsGroupAdmin = (
      <nav class="navbar navbar-expand-sm navbar-light bg-white meetup-nav">
      <div class="container">
        <Link to="/" class="navbar-brand">
          <img src={logo} alt="logo" width="60" height="60"/>
        </Link>

        <button
          class="navbar-toggler bg-black"
          data-toggle="collapse"
          data-target="#navbarCollapse"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        
        <div id="navbarCollapse" class="collapse navbar-collapse">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <Link to="/home" class="nav-link">
              <i class="fas fa-user-circle mr-1">{user.fullname}</i>
            </Link>
          </li>

            <li class="nav-item dropdown mr-0">
             <a class="nav-link dropdown-toggle" id="userDropdown" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Groups Created</a>
            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
               {groupLinks} 
           </div>

           </li>

           <li class="nav-item">
            <Link to="/login" class="nav-link" onClick={this.logout.bind(this)}>
              Logout
            </Link>
          </li>
  
        </ul>
      </div>
       
      </div>
    </nav>
    );

    const userIsAdmin = (
      ""
    );

    const userIsNotAuthenticated = (
   
      <nav class="navbar navbar-expand-sm navbar-light bg-white meetup-nav">
      <div class="container">
        <Link to="/" class="navbar-brand">
          <img src={logo} alt="logo" width="60" height="60"/>
        </Link>

        <button
          class="navbar-toggler bg-black"
          data-toggle="collapse"
          data-target="#navbarCollapse"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div id="navbarCollapse" class="collapse navbar-collapse">
        <ul class="navbar-nav ml-auto">
        
          <li class="nav-item">
            <Link to="/login" class="nav-link">
              Log in
            </Link>
          </li>
  
          <li class="nav-item">
            <Link to="/signup" class="nav-link">
              Sign up
            </Link>
          </li>
        </ul>
      </div>
       
      </div>
    </nav>

    );

  

     let headerLinks;

    if(validToken && user){
      if(user.role === 'ADMIN'){
        headerLinks = userIsAdmin;
      } else if(user.role === "GROUP_ADMIN"){
        {this.props.getAllCreatedGroup()}
        headerLinks = userIsGroupAdmin;
      }
      else {
        headerLinks = userIsAuthenticated;
      }
      
    }else {
      headerLinks = userIsNotAuthenticated;
    }

    return (
      <div>
      {
        headerLinks
      }
      </div>
    );
  }
}
Header.propTypes = {
  logout: PropTypes.func.isRequired,
  security: PropTypes.object.isRequired,
  getAllCreatedGroup: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
  security: state.security,
  user : state.user,
})
export default connect(mapStateToProps, {logout, getAllCreatedGroup})(Header);
