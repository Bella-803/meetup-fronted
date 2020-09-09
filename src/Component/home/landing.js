import React, { Component } from "react";
import CategoryUserView from "../Category/category_user_view";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCategories } from "../../action/categoryActions";


class Landing extends Component {
 
  componentDidMount() {
    if(this.props.security.validToken){
      if(this.props.security.user.role !== 'ADMIN'){
        this.props.history.push("/home");
      }
      else {
        this.props.history.push("/admin");
      }
    }
    this.props.getCategories();
  }

  signupAlert () {
    window.alert("You Need to choose Category first");
  }
  render() {
    const { categories } = this.props.category;
    const fewCategories = [];
    let categoryContents;

    for(let i=0; i < categories.length; i++){
      if(i === 4){
        break;
      }
      fewCategories.push(categories[i]);
  }

    const categoryAlgorithm = (categories) => {
      if(categories.length < 1){
        return (
          <div className="alert alert-danger text-center" role="alert">
                 No Category found.
            </div>
        )
      } else {
           return categoryItem;   
      }
    }

    const categoryItem =  fewCategories.map((category) => (
      <CategoryUserView key={category.id} category={category} />
    ))
  

     categoryContents = categoryAlgorithm(categories);

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
                  <h1 className="h1 pt-5">Discover People</h1>
                  <p className="lead pt-4">
                      Join a local group to meet people, test a new activity or share your passion
                  </p>
                  <a href="/signup" className="btn btn-lg btn-success">Sign Up</a>
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
                The mission of this system is to provide a way for people who likes the same things, 
                who share the same passion to meet over in person so that they can get to know each other and work together
                </p>
              </div>
            </div>
          </div>
        </section>

        {
          //<!--Category Section-->
        }

        <section id="category-section" class="bg-white">
          <div class="container">
            <h3 class="h3 mb-3 pt-4">Categories</h3>
            <div className="d-md-flex justify-content-between">
              <h4 class="h4 text-muted font-italic">
                Find Groups according to category that interest you
              </h4>
              <a href="/home" className="btn btn-primary">

              <i className="fa fa-arrow-right d-inline-block">  </i>
              <span> See All </span> 
              </a>
            </div>
            <div class="row pt-4 pb-4">
               {categoryContents}
            </div>
           
          </div>
        </section>

        {
          //<hr />
          //Services Section
        }
        
        <section id="service-section" className="text-white py-4 bg-green">
          <div>
             <h3 className="text-center pb-5">Need to do often what you really likes? </h3>
          </div>

          <div class="d-flex justify-content-center">

            <div className="services-section  ml-5 pl-5">
                <h1 class="mb-3"> <i class="fa fa-search text-primary"></i> Discover Groups</h1>
                <p className="text-justify" style={{width:' 60%'}}>
                    We give you the opportunity to do things you like. Find out which group is organizing an
                    event about thing you like
                </p>
            </div>
         
            <div className="services-section" >
              <h1 class="mb-3"> <i class="fa fa-plus text-primary"></i> Create Groups</h1>
              <p className="text-justify" style={{width:' 60%'}}>
                 We give you the opportunity to find other people who like the same things.
                 Create a meetup group and join other groups
              </p>
            </div>

           </div>
        </section>

       {
          // <section id="contact-section">
        //    <div class="text-center pt-5">
        //      <h3>For any request or suggestion</h3>
        //      <h3>Feel free to reach out</h3>
        //    </div>
        //    <div class="row">
        //      <div class="col-8 col-md-6 mx-auto">
        //         <div class="card">
        //            <div class="card-body">
        //              <div class="card-form">
        //                 <div class="form-group">
        //                    <label>Your Email</label>
        //                    <input class="form-control" />
        //                 </div>
        //                 <div class="form-group">
        //                    <label>Your Comment</label>
        //                    <textarea class="form-control" />
        //                 </div>
        //                 <a class="btn btn-info">Send</a>
        //              </div>
        //            </div>
        //         </div>
        //      </div>
        //    </div>
        // </section>
      }
        
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