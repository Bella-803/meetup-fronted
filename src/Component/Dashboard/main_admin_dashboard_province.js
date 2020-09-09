import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import {logout} from "../../action/securityAction";
import logo from "../../images/ms_logo.png";
import {Link} from "react-router-dom";
import {addProvince} from "../../action/provinceAction";
import {getProvinces} from "../../action/provinceAction";
import ProvinceItem from '../location/provinceItem';

class MainAdminDashboardProvince extends Component {

    constructor(){
        super();
        this.state = {
            name: "",
            msg: "",
            show : false,
        }

        this.onAddBtnClick = this.onAddBtnClick.bind(this);
        this.hideForm = this.hideForm.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onsubmit = this.onsubmit.bind(this);
    }

    componentDidMount(){
        this.props.getProvinces();
    }

    componentDidUpdate(){
        this.props.getProvinces();
    }

    onChange(e){
        this.setState({ name : e.target.value,})
    }

    onsubmit(e){
        e.preventDefault();
        const newProvince = {
            name: this.state.name,
        }
        this.props.addProvince(newProvince);
        this.setState({ msg: "Province Successfully saved"});
        this.hideForm();
    }

    logout(){
        this.props.logout();
        window.location.href = "/login"
      }

      onAddBtnClick(e){
          this.setState({ show: true})
      }

      hideForm(e){
          this.setState({ show: false})
      }

    render() {

        const {provinces} = this.props.province;

        let provinceBtn;

        if(this.state.show){
            provinceBtn = <div class="col-sm-12 col-md-4 mb-2">
            <div class="card">
              <div class="card-header text-success">
                <div class="card-title">
                <h5>Add Province</h5> 
                </div>
             </div>
             <div class="card-body">
                <div class="card-form">
                  <div class="input-group mb-3">
                   <div class="input-group-prepend">
                     <span class="input-group-text">Province Name</span>
                   </div>
                    <input type="text" class="form-control" name="name" value={this.state.name} onChange={this.onChange} />
                  </div>
                  <input type="submit" value="Save" class="btn btn-success" onClick={this.onsubmit}/>
                 </div>
             </div>
            </div>
         </div>
        } else {
            provinceBtn = ""
        }

        let alertMsg;

        if(this.state.msg === ""){
            alertMsg = "";
        }else {
            alertMsg = <div class="alert alert-success">
                          {this.state.msg}
                       </div>
        }

        return (
            <div>
            <nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark">
            <a class="navbar-brand" href="/"><img src={logo} alt="logo" width="60" height="60" /></a>
            <button class="btn btn-link btn-sm order-1 order-lg-0" id="sidebarToggle" href="#"><i class="fas fa-bars"></i></button>
           {
               // <!-- Navbar Search-->
            }
            <form class="d-none d-md-inline-block form-inline ml-auto mr-0 mr-md-3 my-2 my-md-0">
                <div class="input-group">
                    <input class="form-control" type="text" placeholder="Search for Province" aria-label="Search" aria-describedby="basic-addon2" />
                    <div class="input-group-append">
                        <button class="btn btn-primary" type="button"><i class="fas fa-search"></i></button>
                    </div>
                </div>
            </form>
            {
               // <!-- Navbar-->
            }
            <ul class="navbar-nav ml-auto ml-md-0">
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
               
                    <a class="nav-link collapsed" href="/admin-dashboard-users">
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
                         <a class="nav-link active" href="/admin/location/province">Province</a>
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
                    <div class="container-fluid">
                        <h1 class="mt-4">Dashboard</h1>
                        <ol class="breadcrumb mb-4">
                            <li class="breadcrumb-item ">Dashboard</li>
                            <li class="breadcrumb-item active">Province</li>
                        </ol>

                            {alertMsg}
                        
                        <Link class="btn btn-success mb-2" onClick={this.onAddBtnClick}>
                          <i class="fas fa-plus-circle"></i>
                            Add Province
                        </Link>

                    <div className="row">

                         {provinceBtn}

                         <div className="col-sm-12 col-md-8 mx-auto">
                         
                         
                        <div class="card mb-4">
                            <div class="card-header">
                                <i class="fas fa-table mr-1"></i>
                                Provinces
                            </div>
                            <div class="card-body">
                                <div class="table-responsive">
                                    <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                        <thead>
                                            <tr>
                                                <th>Province Name</th>
                                               
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                          {
                                              provinces.map(province => (
                                                  <ProvinceItem key={province.id} province={province} />
                                              ))
                                          }
                                     
                                        </tbody>
                                    </table>
                                </div>
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
MainAdminDashboardProvince.propTypes = {
    logout: PropTypes.func.isRequired,
    getProvinces: PropTypes.func.isRequired,
    addProvince: PropTypes.func.isRequired,
    province: PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
    province: state.province,
})
export default  connect(mapStateToProps, {logout, getProvinces, addProvince})(MainAdminDashboardProvince);