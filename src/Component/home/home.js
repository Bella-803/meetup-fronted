import React, { Component } from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {getCategories} from "../../action/categoryActions";
import CategoryUserView from '../Category/category_user_view';

class Home extends Component {

    componentDidMount(){
        this.props.getCategories();
    }
    render() {
        const {categories} = this.props.category
        return (
            <div>
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
                      <button className="btn btn-lg btn-success">Start New Group</button>
                    </div>
                  </div>
                </div>
             </div>
           </section>
            {
              //<!--specific groups section-->
            }
            <section id="your-group-section">
              <div class="container">
                <h3 class="h3 mb-3 pt-4">Your Groups</h3>
                <div class="row pt-4 pb-4">
                   {
                       //group item user view
                   }
                </div>
               
              </div>
            </section>
    
            {
              //<!--Category Section-->
            }
    
            <section id="category-section">
              <div class="container">
                <h3 class="h3 mb-3 pt-4">Categories</h3>
               
                <div class="row">
                <div class="col-md-6 ml-auto">
                  <div class="input-group">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Search Category"
                    />
                    <div class="input-group-append">
                      <button class="btn btn-info">Search</button>
                    </div>
                  </div>
                </div>
                </div>

                <div class="row pt-4 pb-4">
                  {categories.map((category) => (
                    <CategoryUserView key={category.id} category={category} />
                  ))}
                </div>
               
              </div>
            </section>
            
            
            </div>
        )
    }
}
Home.propTypes = {
    getCategories: PropTypes.func.isRequired,
    category: PropTypes.object.isRequired,
}
const mapStateToProps = (state) => ({
    category: state.category,
})
export default connect(mapStateToProps, {getCategories})(Home);