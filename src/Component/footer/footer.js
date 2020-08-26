import React, { Component } from "react";

class Footer extends Component {
  render() {
    const newDate = new Date().getFullYear();
    return (
      <section id="main-footer" className="bg-dark">
        <div className="container">
          <div className="row">
            <div className="col text-center text-white py-4">
              <h3>Meetup System</h3>
              <p>
                copyright &copy; <span id="year">{newDate}</span>
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
export default Footer;
