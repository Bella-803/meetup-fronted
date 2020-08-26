import React, { Component } from "react";
import image1 from "../../images/image3.jpg";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getGroups } from "../../action/groupAction";
import { getCategory } from "../../action/categoryActions";
import GroupItemsAdminView from "../group/group_items_admin_view";

class GroupAdminDashboard extends Component {
  componentDidMount() {
    const { catId } = this.props.match.params;
    this.props.getCategory(catId, this.props.history);
    this.props.getGroups(catId);
  }

  render() {
    const { groups } = this.props.group;
    const { category } = this.props;
    return (
      <div>
        <div class="bg-info py-2 text-white" id="dashboard-heading">
          <div class="container">
            <Link
              to={`/showcategoryitem/${category.id}`}
              class="text-white btn font-italic"
            >
              <h2 class="">Back</h2>
            </Link>
          </div>
        </div>
            <div class="row">
              <div class="col-md-12">
                <br />
                <br />
                {groups.map((group) => (
                  <GroupItemsAdminView key={group.id} group={group} />
                ))}
              </div>
            </div>
      </div>
    );
  }
}
GroupAdminDashboard.propType = {
  getCategory: PropTypes.func.isRequired,
  getGroups: PropTypes.object.isRequired,
  category: PropTypes.object.isRequired,
  group: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  category: state.category.category,
  group: state.group,
});
export default connect(mapStateToProps, { getGroups, getCategory })(
  GroupAdminDashboard
);
