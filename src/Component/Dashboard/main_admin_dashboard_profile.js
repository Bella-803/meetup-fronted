import React, { Component } from 'react';
import {Link} from "react-router-dom";
import logo from "../../images/ms_logo.png";
import {logout} from "../../action/securityAction";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import "../../dashboard_style.css";
import defaultImage from "../../images/default_image.jpg";
import {uploadUserProfile} from "../../action/userAction";
import {getUser} from "../../action/userAction";

class MainAdminDashboardProfile extends Component {

    constructor(){
        super();
        this.state = {
            selectedFile: "",
            msg: "",
        }
        this.onChange = this.onChange.bind(this);
        this.onUploadClick = this.onUploadClick.bind(this);
    }

    componentDidMount(){
        if(this.props.security.user.role !== 'ADMIN'){
          this.props.history.push("/access-denied");
        }
        const userId = this.props.security.user.id
        this.props.getUser(userId);
    }
    logout(){
        this.props.logout();
        window.location.href = "/login"
      }

    onChange(e){
        this.setState({
            selectedFile: e.target.files[0],
        })
    }
    onUploadClick(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', this.state.selectedFile);
        this.props.uploadUserProfile(formData);
        
    }

    render() {
        let myImage;
        const {member} = this.props;

        if(member.profilePhotoPath == "" || member.profilePhotoPath == null) {
          myImage = defaultImage;
        }
        else {
            myImage = member.profilePhotoPath
        }

        return (
            <div>
            <nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark">
            <a class="navbar-brand" href="/"><img src={logo} alt="logo" width="60" height="60"/></a>
            <button class="btn btn-link btn-sm order-1 order-lg-0" id="sidebarToggle" href="#"><i class="fas fa-bars"></i></button>
  
            {
               // <!-- Navbar-->
            }
            <ul class="navbar-nav ml-auto">
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" id="userDropdown" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fas fa-user fa-fw"></i></a>
                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
                        <Link class="dropdown-item" to="/admin/profile">Your Account</Link>
                        <Link class="dropdown-item" to="/logout" onClick={this.logout.bind(this)}>Logout</Link>
                    </div>
                </li>
            </ul>
        </nav>
        <div id="layoutSidenav">
            <div id="layoutSidenav_nav">
                <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                    <div class="sb-sidenav-menu">
                        <div class="nav">
                            <a class="nav-link" href="/admin">
                                <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                                Dashboard
                            </a>
                            <div class="sb-sidenav-menu-heading">Interface</div>
                            <a class="nav-link collapsed" href="/admin-dashboard-categories">
                                <div class="sb-nav-link-icon"><i class="fas fa-columns"></i></div>
                                Category
                              
                            </a>
                           
                            <a class="nav-link collapsed" href="/admin-dashboard-users" >
                                <div class="sb-nav-link-icon"><i class="fas fa-book-open"></i></div>
                                Users
                              
                            </a>
                          
                            <a class="nav-link" href="/admin-dashboard-groups">
                                <div class="sb-nav-link-icon"><i class="fas fa-chart-area"></i></div>
                                Meetup Groups
                            </a>
                            <a class="nav-link" href="/admin-dashboard-meetups">
                                <div class="sb-nav-link-icon"><i class="fas fa-table"></i></div>
                                Meetups
                            </a>

                            <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseLocation" aria-expanded="false" aria-controls="collapseLocation">
                            <div class="sb-nav-link-icon"><i class="fas fa-location"></i></div>
                               Location
                            <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
                            </a>
                               <div class="collapse" id="collapseLocation" aria-labelledby="headingOne" data-parent="#sidenavAccordion">
                                  <nav class="sb-sidenav-menu-nested nav">
                                     <a class="nav-link" href="/admin/location/province">Province</a>
                                     <a class="nav-link" href="/admin/location/district">District</a>
                                     <a class="nav-link" href="/admin/location/sector">Sector</a>
                                 </nav>
                             </div>

                             <a class="nav-link" href="/admin/report">
                              <div class="sb-nav-link-icon"><i class="fa fa-file"></i></div>
                                Report
                             </a> 

                        </div>
                    </div>
                    <div class="sb-sidenav-footer">
                        <div class="small">Logged in as:</div>
                        Meetup System
                    </div>
                </nav>
            </div>
            
            <div id="layoutSidenav_content">
                <main>
                <div class="profile-container">

                <div class="profile-image-container">
                   <img src={myImage} width="300" height="300" class="img-fluid "/>
                   <input type="file" name="file" onChange={this.onChange}/>
                   <button onClick={this.onUploadClick}>Edit Profile</button>
                </div>

                <div class="profile-content-container">
                   <div class="profile-content-title">
                      <h1>Account</h1>
                      <p>Edit your account settings and change your password</p>
                    </div>
                    <div class="profile-content-email">
                        <p>Your email is : <strong>{member.email}</strong></p>
                    </div>
                    <div class="profile-content-form">
                     <form>
                       <div class="input-group mb-2">
                         <div class="input-group-prepend">
                           <span class="input-group-text">Full Name</span> 
                         </div>
                          <input id="fullname" name="fullname" class="form-control" />
                       </div>

                       <div class="input-group mb-2">
                          <div class="input-group-prepend">
                              <span class="input-group-text"><i class="fas fa-lock"></i></span> 
                          </div>
                          <input id="cuurrent-password" name="password" class="form-control" placeholder="Current Password"/>
                       </div>

                       <div class="input-group mb-2">
                         <div class="input-group-prepend">
                           <span class="input-group-text"><i class="fas fa-lock"></i></span> 
                         </div>
                         <input id="new-password" name="password" class="form-control" placeholder="New Password"/>
                       </div>

                       <div class="input-group mb-2">
                          <div class="input-group-prepend">
                            <span class="input-group-text"><i class="fas fa-lock"></i></span> 
                          </div>
                         <input id="confirm-password" name="password" class="form-control" placeholder="Confirm Password"/>
                       </div>

                       <input type="submit" value="Edit" class="btn btn-primary px-5 py-2 mt-3 mb-4"/>
                    </form>
                  </div>
             </div>
            </div>
                </main>
                <footer class="py-4 bg-light mt-auto">
                    <div class="container-fluid">
                        <div class="d-flex align-items-center justify-content-between small">
                            <div class="text-muted">Copyright &copy; Meetup System 2020</div>
                            <div>
                                <a href="#">Privacy Policy</a>
                                &middot;
                               { 
                                   //<a href="#">Terms &amp; Conditions</a>
                                }
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    </div>
        )
    }
}
MainAdminDashboardProfile.propTypes = {
    security: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
    uploadUserProfile: PropTypes.func.isRequired,
    member: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    security: state.security,
    member: state.member.member,
})
export default connect(mapStateToProps, {logout, uploadUserProfile, getUser})(MainAdminDashboardProfile);