import React, { Component } from "react";
import {Link} from "react-router-dom";
import Admin_Dashboard_Category from "./Admin_Dashboard_Category";
import "../../dashboard_style.css";
import Breadcrumb from "react-bootstrap/Breadcrumb";

class AdminDashboard extends Component {
  render() {
    return (
      

      <section id="dashboard-menu" >
       <div className="row">
        <div className="col-md-2">
          <div className="container-fluid ">
            <div className="nav-sidebar-left">
              <div>
                 
              </div>
             <h2 className="text-center m-auto pt-4 text-light">Dashboard</h2>
              <div className="">
                <div className="d-flex flex-column">
                  <div className="text-center py-4">
                    <Link to='/admin-dashboard-users' className="dashboard-menu-link">
                      Users
                    </Link>
                  </div>
                  <div className="text-center py-4">
                    <Link to='/adminDashboardCategory' className="dashboard-menu-link">
                      Category
                    </Link>
                  </div>
                  <div className="text-center py-4">
                    <a href="#" className="dashboard-menu-link">
                      Group
                    </a>
                  </div>
                  <div className="text-center py-4">
                    <a href="#" className="dashboard-menu-link">
                      Meetings
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>

          <div className="col-md-10">
            <div className="row dash-breadcrumb">
              <div className="col-12">
                 <Breadcrumb>
                   <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                   <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                 </Breadcrumb>
              </div>
             </div>
             <div className="row">
             <div className="col-12">
             <div className=" d-flex justify-content-center">
               <div className="card dash-card text-center text-info px-5 mr-3 my-3">
                 <div className="card-body">
                   <h3>Users</h3>
                   <h4 className="display-5">
                     <i className="fas fa-users"></i> 150
                   </h4>
                 </div>
               </div>
           
               <div className="card dash-card text-center text-info px-5 mr-3 my-3">
                 <div className="card-body">
                   <h3>Categories</h3>
                   <h4 className="display-5">
                     <i className="fas fa-users"></i> 40
                   </h4>
                 
                 </div>
               </div>
           
               <div className="card dash-card text-center text-info px-5 mr-3 my-3">
                 <div className="card-body">
                   <h3>Groups</h3>
                   <h4 className="display-5">
                     <i className="fas fa-users"></i> 180
                   </h4>
                 
                 </div>
               </div>
           
               <div className="card dash-card text-info px-5 mr-3 my-3">
                 <div className="card-body">
                   <h3>Meetings</h3>
                   <h4 className="display-5">
                     <i className="fas fa-users"></i>100
                   </h4>
                 
                 </div>
               </div>
           
             </div>
           </div>
         </div>
      
          
          </div>
          </div>
        </section>
      
    );
  }
}
export default AdminDashboard;


