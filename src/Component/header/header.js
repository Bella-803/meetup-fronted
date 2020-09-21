import React, { Component } from "react";
import {Link} from "react-router-dom";
import logo from "../../images/ms_logo.png";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {logout} from "../../action/securityAction";
import {getAllCreatedGroup} from "../../action/userAction";


class Header extends Component {

  componentDidUpdate(){
    this.props.getAllCreatedGroup();
  }

  logout(){
    this.props.logout();
    window.location.href = "/"
  }

  render() {

      const {ownedGroups} = this.props.user;

      const groupLinks = ownedGroups.map(group => (
      <Link className="dropdown-item" to={`/groupadmindashboard/${group.id}/${group.category.id}`}> {group.groupName}</Link>
    ))
  
     

    const {validToken, user} = this.props.security;
   
    const userIsAuthenticated = (

      <nav className="navbar navbar-expand-sm navbar-light bg-white meetup-nav">
      <div className="container">
        <Link to="/" className="navbar-brand">
          <img src={logo} alt="logo" width="60" height="60"/>
        </Link>

        <button
          className="navbar-toggler"
          data-toggle="collapse"
          data-target="#navbarCollapse"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div id="navbarCollapse" className="collapse navbar-collapse">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link to="/home" className="nav-link">
              <i className="fas fa-user-circle mr-1">{user.fullname}</i>
            </Link>
          </li>
  
          <li className="nav-item">
            <Link to="/login" className="nav-link" onClick={this.logout.bind(this)}>
              Logout
            </Link>
          </li>
  
        </ul>
      </div>
       
      </div>
    </nav>

    
    );

    const userIsGroupAdmin = (
      <nav className="navbar navbar-expand-sm navbar-light bg-white meetup-nav">
      <div className="container">
        <Link to="/" className="navbar-brand">
          <img src={logo} alt="logo" width="60" height="60"/>
        </Link>

        <button
          className="navbar-toggler bg-black"
          data-toggle="collapse"
          data-target="#navbarCollapse"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div id="navbarCollapse" className="collapse navbar-collapse">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link to="/home" className="nav-link">
              <i className="fas fa-user-circle mr-1">{user.fullname}</i>
            </Link>
          </li>

            <li className="nav-item dropdown mr-0">
             <a className="nav-link dropdown-toggle" id="userDropdown" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Groups Created</a>
            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
               {
                 groupLinks
                } 
           </div>

           </li>

           <li className="nav-item">
            <Link to="/login" className="nav-link" onClick={this.logout.bind(this)}>
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
   
      <nav className="navbar navbar-expand-sm navbar-light bg-white meetup-nav">
      <div className="container">
        <Link to="/" className="navbar-brand">
          <img src={logo} alt="logo" width="60" height="60"/>
        </Link>

        <button
          className="navbar-toggler bg-black"
          data-toggle="collapse"
          data-target="#navbarCollapse"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div id="navbarCollapse" className="collapse navbar-collapse">
        <ul className="navbar-nav ml-auto">
        
          <li className="nav-item">
            <Link to="/login" className="nav-link">
              Log in
            </Link>
          </li>
  
          <li className="nav-item">
            <Link to="/signup" className="nav-link">
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
        // {this.props.getAllCreatedGroup()}
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
  getAllCreatedGroup,
})
export default connect(mapStateToProps, {logout, getAllCreatedGroup})(Header);
