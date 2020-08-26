import React, { Component } from "react";
import CategoryItem from "../Category/CategoryItem";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCategories } from "../../action/categoryActions";
import AddCategory from "../Category/AddCategory";
import CategItem from "../Category/CategItem";

class AdminDashboardCategory extends Component {
  componentDidMount() {
    this.props.getCategories();
  }
  render() {
    return (
      <main id="main-section">
        {
          //   Header Section
        }
        <section class="bg-info py-3 text-white" id="dashboard-heading">
          <div class="container">
            <h2 class="">Category</h2>
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
                    placeholder="Search Category"
                  />
                  <div class="input-group-append">
                    <button class="btn btn-info">Search</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {
          //<!--Details Section-->
        }
        <section id="posts">
          <div class="container">
            <div class="row">
              <div class="col">
                <CategoryItem history={this.props.history} category={this.props.category}/>
      
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }
}

AdminDashboardCategory.propTypes = {
  getCategories: PropTypes.func.isRequired,
  category: PropTypes.object.isRequired,
};
const mapStateToProp = (state) => ({
  category: state.category,
});
export default connect(mapStateToProp, { getCategories })(
  AdminDashboardCategory
);
