import React, { Component } from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {getAllMeetups} from "../../action/meetupAction";
import {logout} from "../../action/securityAction";
import logo from "../../images/ms_logo.png";
import pdfGenerator from "../../action/reportGenerator";

class MainAdminDashboardReport extends Component {

    constructor(){
        super();
        this.state ={
            selectedMonth: "",
            selectedMonthName: "",
            notFoundMsg: "",
        }

        this.onChange = this.onChange.bind(this);
        this.getAllMonths = this.getAllMonths.bind(this);
    }

    componentDidMount(){
        this.props.getAllMeetups();
        if(this.props.security.user.role !== 'ADMIN'){
            this.props.history.push("/access-denied");
          }
    }

    logout(){
        this.props.logout();
        window.location.href = "/login"
      }

      onChange(e){
        this.setState({
            selectedMonth: e.target.value,
        })
    }
    
    getAllMonths(){
        return [
              {name : "January", value: "01"}, 
              {name : "February", value: "02"},
              {name : "March", value: "03"},
              {name : "April", value: "04"},
              {name : "May", value: "05"},
              {name : "June", value: "06"},
              {name : "July", value: "07"},
              {name : "August", value: "08"},
              {name : "September", value: "09"},
              {name : "October", value: "10"},
              {name : "November", value: "11"},
              {name : "December", value: "12"}
              ];
    }

    render() {


        const {meetups} = this.props.meetup;
        const months = this.getAllMonths();
        const monthOption = months.map(month => (
            <option value={month.value}>{month.name}</option>
        ))

        let filteredData = [];
        let filteredMeetups;
        let notFoundMsgDiv;

        if(this.state.selectedMonth === ""){
            filteredData = meetups;
        }else {
            filteredData = meetups.filter(meetup => {
                const meetupDate =  meetup.dateAndTime.split("-");
                const monthValue = meetupDate[1];
                return monthValue === this.state.selectedMonth;
            })
        }
        
        if(filteredData.length < 1){
            notFoundMsgDiv = <div className="alert alert-danger">No meetup has been scheduled this month</div>
        }
        else {
            notFoundMsgDiv = "";
            filteredMeetups = filteredData.map(meetup => (
                <tr key={meetup.id}>
                  <td>{meetup.meetingTitle}</td>
                  <td>{meetup.description}</td>
                  <td>{meetup.meetupGroup.groupName}</td>
                  <td>{meetup.meetupGroup.category.categoryName}</td>
                  <td>{meetup.dateAndTime}</td>
                  <td>{meetup.location}</td>
                  <td>{meetup.numberOfAttendees}</td>
                </tr>
            ))
        }

        return (
            <div>
            <nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark">
            <a class="navbar-brand" href="/"><img src={logo} alt="logo" width="60" height="60" /></a>
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

                     <a class="nav-link active" href="/admin/report">
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

                       <div class="alert alert-success">
                          <h4>Report Meetup Scheduled in a specified Month</h4>
                       </div>
                      
                       <div className="container mb-4 mt-4 p-3">
                         <div className="row">

                            <div class="form-group mr-2">
                                 <select className="form-control border border-success" name="selectedMonth" onChange={this.onChange}>
                                    <option>---Select Month---</option>
                                       {monthOption}
                                 </select>
                            </div>
                          
                            <input type="submit" value="Generate Report" 
                                       className="btn btn-success" 
                                       onClick={() => pdfGenerator(filteredData)}/>

                          </div>
                    </div>

                          {notFoundMsgDiv}
                      
                        <div class="card mb-4">
                            <div class="card-header">
                                <i class="fas fa-table mr-1"></i>
                                Meetups
                            </div>
                            <div class="card-body">
                                <div class="table-responsive">
                                    <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                        <thead>
                                            <tr>
                                                <th>Meeting Title</th>
                                                <th>Meeting Description</th>
                                                <th>Group Name</th>
                                                <th>Category Name</th>
                                                <th>Date And Time</th>
                                                <th>Location</th>
                                                <th>Number of Attendees</th>
                                            </tr>
                                        </thead>
                                       
                                        <tbody>   
                                          {
                                            filteredMeetups
                                          }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                <footer class="py-4 bg-light mt-auto">
                    <div class="container-fluid">
                        <div class="d-flex align-items-center justify-content-between small">
                            <div class="text-muted">Copyright &copy; Meetup System 2020</div>
                          
                        </div>
                    </div>
                </footer>
            </div>
        </div>
            </div>
        )
    }
}
MainAdminDashboardReport.propTypes = {
    getAllMeetups: PropTypes.func.isRequired,
    meetup: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
}
const mapStateToProps = state => ({
    meetup: state.meetup,
    security: state.security,
})
export default  connect(mapStateToProps, {getAllMeetups, logout})(MainAdminDashboardReport);