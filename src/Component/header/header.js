import React, { Component } from "react";
import {Link} from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <nav class="navbar navbar-expand-sm navbar-dark bg-dark meetup-nav">
        <div class="container">
          <Link to="/" class="navbar-brand">
            Meetup System
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
                <Link to="/login" class="nav-link">
                  Create Group
                </Link>
              </li>

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
  }
}
export default Header;
