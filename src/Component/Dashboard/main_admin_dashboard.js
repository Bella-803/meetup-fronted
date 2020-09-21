import React, { Component } from 'react';
import "../../dashboard_style.css";
import logo from "../../images/ms_logo.png";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {logout} from "../../action/securityAction";
import { Link } from 'react-router-dom';
import {getNumberOfCategories} from "../../action/categoryActions";
import {getNumberOfGroups} from "../../action/groupAction";
import {getNumberOfMeetups} from "../../action/meetupAction";
import {getNumberOfUsers} from "../../action/userAction";
import $ from "jquery";


class MainAdminDashboard extends Component {

    constructor(){
        super();
    }
    componentDidMount(){
        if(this.props.security.user.role !== 'ADMIN'){
          this.props.history.push("/access-denied");
        }
        this.props.getNumberOfCategories();
        this.props.getNumberOfGroups();
        this.props.getNumberOfMeetups();
        this.props.getNumberOfUsers();
    }

    logout(){
      this.props.logout();
      window.location.href = "/login"
    }


    render() {

         const {numberOfCategories} = this.props;
         const {numberOfUsers} = this.props;
         const {numberOfMeetups} = this.props;
         const {numberOfGroups} = this.props;

        return (
            <div>
            <nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark meetup-nav">
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
                            <a class="nav-link active" href="/admin">
                                <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                                Dashboard
                            </a>
                            <div class="sb-sidenav-menu-heading">Interface</div>
                            <a class="nav-link collapsed dash-link" href="/admin-dashboard-categories">
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
                <main>
                    <div class="container-fluid">
                        <h1 class="mt-4">Dashboard</h1>
                        <ol class="breadcrumb mb-4">
                            <li class="breadcrumb-item active">Dashboard</li>
                        </ol>
                        <div class="row">
                           <div class="col-xl-3 col-md-6 ">
                              <div className="card dash-card text-green mb-4">
                                 <div className="card-body">
                                    <h3>Categories</h3>
                                </div>
                                <div class="card-footer d-flex align-items-center justify-content-between">
                                  <h4 className="display-5">
                                    {numberOfCategories}
                                  </h4>
                                </div>
                              </div>

                            </div>
                            <div class="col-xl-3 col-md-6">
                              <div className="card dash-card text-green mb-4">
                                <div className="card-body">
                                  <h3>Users</h3>
                                </div>
                              <div class="card-footer d-flex align-items-center justify-content-between">
                                <h4 className="display-5">
                                   <i className="fas fa-users"></i> {numberOfUsers}
                                </h4>
                              </div>
                            </div>
                            </div>

                            <div class="col-xl-3 col-md-6">
                              <div className="card dash-card text-green mb-4">
                                 <div className="card-body">
                                    <h3>Meetup Groups</h3>
                                 </div>
                                 <div class="card-footer d-flex align-items-center justify-content-between">
                                   <h4 className="display-5">
                                      <i className="fas fa-users"></i> {numberOfGroups}
                                   </h4>
                                 </div>
                               </div>
                            </div>

                            <div class="col-xl-3 col-md-6">
                               <div className="card dash-card text-green mb-4">
                                   <div className="card-body">
                                       <h3>Meetup</h3>
                                   </div>
                                  <div class="card-footer d-flex align-items-center justify-content-between">
                                      <h4 className="display-5">
                                        <i className="fas fa-users"></i> {numberOfMeetups}
                                      </h4>
                                  </div>
                              </div>
                            </div>
                        </div>
                      
                    </div>
                </main>
                <footer class="py-4 bg-light mt-auto">
                    <div class="container-fluid">
                        <div class="d-flex align-items-center justify-content-between small">
                            <div class="text-muted">Copyright &copy; Meetup System 2020</div>
                            {
                            //     <div>
                            //     <a href="#">Privacy Policy</a>
                            //     &middot;
                            //    { 
                            //        //<a href="#">Terms &amp; Conditions</a>
                            //     }
                            // </div>
                        }
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    </div>
        )
    }
}
MainAdminDashboard.propTypes = {
    security: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,

    getNumberOfCategories: PropTypes.func.isRequired,
    getNumberOfMeetups: PropTypes.func.isRequired,
    getNumberOfGroups: PropTypes.func.isRequired,
    getNumberOfUsers: PropTypes.func.isRequired,

    numberOfCategories: PropTypes.object.isRequired,
    numberOfGroups: PropTypes.object.isRequired,
    numberOfMeetups: PropTypes.object.isRequired,
    numberOfUsers: PropTypes.object.isRequired,

}
const mapStateToProps = state => ({
    security: state.security,
    numberOfCategories: state.admin.numberOfCategories,
    numberOfGroups: state.admin.numberOfGroups,
    numberOfMeetups: state.admin.numberOfMeetups,
    numberOfUsers: state.admin.numberOfUsers,
})
export default connect(mapStateToProps, {logout, getNumberOfCategories, getNumberOfGroups, getNumberOfMeetups, getNumberOfUsers})(MainAdminDashboard);