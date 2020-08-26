import React, { Component } from 'react'
import { Link } from 'react-router-dom';

class AdminDashboardUsers extends Component {
    render() {
        
        return (
            <div>
           {
               // <!--Header Section-->
            }
            <section class="bg-darkgreen py-3 text-white" id="dashboard-heading">
              <div class="container">
                <h2 class="">Users</h2>
              </div>
            </section>
      
           {
               // <!--Search Section-->
            }
            <section id="search" class="bg-light py-3">
              <div class="container">
                <div class="row">
                  <div class="col-md-6 ml-auto">
                    <div class="input-group">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Search Group"
                      />
                      <div class="input-group-append">
                        <button class="btn bg-darkgreen text-white">Search</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
      
           
            <section id="posts">
              <div class="container">
                <div class="row">
                  <div class="col">
                    <div class="card">
                      <div class="card-header">
                      </div>
                      <table class="table table-striped">
                        <thead class="bg-darkgreen text-white">
                          <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Category</th>
                            <th>Owner</th>
                            <th>No of Members</th>
                            <th>No of Meetings</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>1</td>
                            <td>Kigali Learning Python Group</td>
                            <td>
                              <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing
                                elit. Nihil, atque.
                              </p>
                            </td>
                            <td>Technology</td>
                            <td>Bella Amandine</td>
                            <td>10</td>
                            <td>3</td>
                            <td>
                              <Link href="#" class="btn btn-danger">
                                <i class="fas fa-trash"> Delete</i>
                              </Link>
                            </td>
                          </tr>
                      
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            </div>
        )
    }
}
export default AdminDashboardUsers;