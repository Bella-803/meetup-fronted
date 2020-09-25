import React, { Component } from 'react';
import logo from "../../images/ms_logo.png";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCategories } from "../../action/categoryActions";
import CategoryItemAdminView from '../Category/category_item_admin_view';
import {logout} from "../../action/securityAction";

 class MainAdminDashboardCategory extends Component {

    constructor(){
        super();
        this.state = {
            searchText: "",
            filteredCategories: [],
        }
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        this.props.getCategories();
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
              searchText: e.target.value,
          })
          const {categories} = this.props.category;
          const newCategs = categories.filter(category => {
              return category.categoryName.toLowerCase().includes(this.state.searchText.toLowerCase());
          })
          this.setState({
              filteredCategories: newCategs,
          })
      }

    render() {
        const {categories} = this.props.category;

        let categoriesContent;

        if(this.state.searchText === ""){
            categoriesContent = categories;
        }else {
            categoriesContent = this.state.filteredCategories;
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
                    <input class="form-control" type="text" placeholder="Search for Category" aria-label="Search" aria-describedby="basic-addon2" onInput={this.onChange} />
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
                    <a class="nav-link collapsed active" href="/admin-dashboard-categories">
                     <div class="sb-nav-link-icon"><i class="fa fa-list-alt"></i></div>
                       Category
                    </a>
               
                    <a class="nav-link collapsed" href="/admin-dashboard-users">
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
                            <li class="breadcrumb-item ">Dashboard</li>
                            <li class="breadcrumb-item active">Category</li>
                        </ol>
                        <Link to="/add-category" class="btn btn-info mb-2">
                          <i class="fas fa-plus-circle"></i>
                            Add Category
                        </Link>
                        <div class="card mb-4">
                            <div class="card-header">
                                <i class="fas fa-table mr-1"></i>
                                Category
                            </div>
                            <div class="card-body">
                                <div class="table-responsive">
                                    <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                        <thead>
                                            <tr>
                                                <th>Image</th>
                                                <th>Category Name</th>
                                                <th>Category Description</th>
                                                <th>Number of Groups</th>
                                                <th>Edit</th>
                                                <th>Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                        {categoriesContent.map((category) => (

                                            <CategoryItemAdminView key={category.id} category={category} />
                                            
                                          ))}
                                     
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
MainAdminDashboardCategory.propTypes = {
    getCategories: PropTypes.func.isRequired,
    category: PropTypes.object.isRequired,
    security: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
};
const mapStateToProp = (state) => ({
  category: state.category,
  security: state.security,
});

export default connect(mapStateToProp, {getCategories, logout})(MainAdminDashboardCategory);