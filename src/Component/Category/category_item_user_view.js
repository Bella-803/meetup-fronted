import React, { Component } from "react";
import image1 from "../../images/image1.jpg";
import { Link } from "react-router-dom";
import GroupItemUserView from "../group/group_item_user_view";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCategory } from "../../action/categoryActions";
import { getGroups } from "../../action/groupAction";

class CategoryItemUserView extends Component {
  componentDidMount() {
    const { catId } = this.props.match.params;
    this.props.getCategory(catId, this.props.history);
    this.props.getGroups(catId);
  }
  render() {
    const { category } = this.props;
    const { groups } = this.props.group;
    return (
      <div className="container">
        <section id="categorySection" class="pt-5">
          <div class="row">
            <div class="col-lg-5 col-md-6">
              <img src={image1} alt="" class="img-fluid" />
            </div>
            <div class="col-lg-7 col-md-6 pl-5">
              <h3 class="h3">{category.categoryName}</h3>
              <p class="mb-5">{category.description}</p>
              <Link
                to={`/addGroup/${category.id}`}
                class="btn btn-outline-primary btn-lg"
              >
                Create Group
              </Link>
            </div>
          </div>
          <br />
          <hr />
        </section>
        <div className="container">
          <section id="group-section" class=" mb-5">
            <div className="container">
              <h3 class="h4">Some Groups</h3>
              <div class="d-flex flex-row justify-content-between">
                <div>
                  <h5 class="mb-3 text-muted font-italic">
                    Groups in this category
                  </h5>
                </div>
              </div>

              <div class="row">
                {groups.map((group) => (
                  <GroupItemUserView key={group.id} group={group}/>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}
CategoryItemUserView.propTypes = {
  getCategory: PropTypes.func.isRequired,
  getGroups: PropTypes.func.isRequired,
  category: PropTypes.object.isRequired,
  groups: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  category: state.category.category,
  group: state.group,
});
export default connect(mapStateToProps, { getCategory, getGroups })(
  CategoryItemUserView
);
