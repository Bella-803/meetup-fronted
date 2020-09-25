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
                                <div class="sb-nav-link-icon"><i class="fa fa-list-alt"></i></div>
                                Category
                              
                            </a>
                           
                            <a class="nav-link collapsed" href="/admin-dashboard-users" >
                                <div class="sb-nav-link-icon"><i class="fas fa-users"></i></div>
                                Users
                              
                            </a>
                          
                            <a class="nav-link" href="/admin-dashboard-groups">
                                <div class="sb-nav-link-icon"><i class="fas fa-user-friends"></i></div>
                                Meetup Groups
                            </a>
                            <a class="nav-link" href="/admin-dashboard-meetups">
                                <div class="sb-nav-link-icon"><i class="fas fa-share-alt"></i></div>
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
                        <div class="small">Logged in as: {this.props.security.user.fullname}</div>
                        Meetup System
                    </div>
                </nav>
            </div>
            
            <div id="layoutSidenav_content">
                       
        <section id="profile">
            <div class="container">
              <div class="row">
                <div class="col-md-9 mt-5">
                  <div class="card">
                    <div class="card-header">
                      <h4>Your Account</h4>
                    </div>
                    <div class="card-body">
                      <form>
                        <div class="form-group">
                          <label for="name">Fullname</label>
                         <input type="text" class="form-control" value={member.fullname} />
                        </div>
                         <div class="form-group">
                          <label for="email">Email</label>
                         <input type="email" class="form-control" value={member.email} />
                        </div>
                        <div class="form-group">
                        <label for="name">Username</label>
                       <input type="text" class="form-control" value={member.username} />
                      </div>
                         
                      </form>
                    </div>
                  </div>
                </div>
      
                <div class="col-md-3 mt-3">
                   <h3>Your Profile Picture</h3>
                   <img src={myImage} alt="" class="img-fluid d-block mb-3" />
                   <input type="file" name="file" onChange={this.onChange}/>
                   <button class="btn btn-primary btn-block mt-2" onClick={this.onUploadClick}>Edit Image</button>
                </div>
              </div>
            </div>
          </section>

                 

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