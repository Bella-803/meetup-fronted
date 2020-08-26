import React, { Component } from "react";
import CategoryUserView from "../Category/category_user_view";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCategories } from "../../action/categoryActions";
import image1 from "../../images/image1.jpg";
import image2 from "../../images/image2.jpg";
import image3 from "../../images/image3.jpg";


class Landing extends Component {
 
  componentDidMount() {
    if(this.props.security.validToken){
      this.props.history.push("/home");
    }
    this.props.getCategories();
  }

  signupAlert () {
    window.alert("You Need to choose Category first");
  }
  render() {
    const { categories } = this.props.category;

    return (
      <main id="main-section">
        {
          // <!--heading-->
        }
        <section id="heading-section">
          <div className="container">
            <div className="dark-overlay">
              <div className="row py-5">
                <div className="col-4 text-white d-flex flex-column align-items-center mx-auto text-center py-5">
                  <h1 className="h1 pt-5">Share and Learn</h1>
                  <p className="lead pt-4">
                      Increase your knowlegde and Skills by working with other like-minded
                  </p>
                  <button className="btn btn-lg btn-success">Sign Up</button>
                </div>
              </div>
            </div>
         </div>
       </section>
        {
          //<!--Mission Section-->
        }
        <section id="mission-section" class="bg-black-0 text-center py-md-4">
          <div class="container">
            <div class="row">
              <div class="col-md-7 text-black text-center mx-auto">
                <h2 class="h4 pt-3">Our Mission</h2>
                <p class="lead pt-4">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo
                  nemo, provident dolorem mollitia quis sed sequi a enim
                  perferendis, suscipit sunt cupiditate porro, modi ullam
                  blanditiis odio iure! Perspiciatis, ipsum.
                </p>
              </div>
            </div>
          </div>
        </section>

        {
          //<!--Category Section-->
        }

        <section id="category-section">
          <div class="container">
            <h3 class="h3 mb-3 pt-4">Categories</h3>
            <div className="d-md-flex justify-content-between">
              <h4 class="h4 text-muted font-italic">
                Find Groups according to category that interest you
              </h4>
              <a href="/login" className="btn btn-primary">

              <i className="fa fa-arrow-right d-inline-block">  </i>
              <span> See All </span> 
              </a>
            </div>
            <div class="row pt-4 pb-4">
              {categories.map((category) => (
                <CategoryUserView key={category.id} category={category} />
              ))}
            </div>
           
          </div>
        </section>

        {
          //<hr />
          //Services Section
        }
        
        <section id="service-section" className="text-dark py-4">
          <div>
             <h3 className="text-center">Our Services</h3>
          </div>
          <div className="d-md-flex justify-content-center">
            <div className="services-section py-4 mr-5">
              <img src={image1} className="img-fluid mb-3 border border-radius" alt="" width="400" height="400"/>
              <p className="text-justify">
                 Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo
                 nemo, provident dolorem mollitia quis sed sequi a enim
                 perferendis, suscipit sunt cupiditate porro, modi ullam
                 blanditiis odio iure! Perspiciatis, ipsum.
              </p>
            </div>

            <div className="services-section py-4 mr-5">
            <img src={image2} className="img-fluid mb-3" alt="" width="400" height="400"/>
            <p className="text-justify">
               Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo
               nemo, provident dolorem mollitia quis sed sequi a enim
               perferendis, suscipit sunt cupiditate porro, modi ullam
               blanditiis odio iure! Perspiciatis, ipsum.
            </p>
          </div>

          <div className="services-section py-4 mr-5">
          <img src={image3} className="img-fluid mb-3" alt="" width="400" height="400"/>
          <p className="text-justify">
             Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo
             nemo, provident dolorem mollitia quis sed sequi a enim
             perferendis, suscipit sunt cupiditate porro, modi ullam
             blanditiis odio iure! Perspiciatis, ipsum.
          </p>
        </div>

          </div>
        </section>

      </main>
    );
  }
}
Landing.propTypes = {
  getCategories: PropTypes.func.isRequired,
  category: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  category: state.category,
  security: state.security,
});
export default connect(mapStateToProps, { getCategories })(Landing);


//d-sm-block mb-5