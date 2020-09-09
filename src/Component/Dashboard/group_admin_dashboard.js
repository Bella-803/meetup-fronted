import React, { Component } from "react";
import image1 from "../../images/image3.jpg";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getGroup } from "../../action/groupAction";
import { getCategory } from "../../action/categoryActions";
import GroupItemsAdminView from "../group/group_items_admin_view";

class GroupAdminDashboard extends Component {

  componentDidMount(){
    console.log("Inside compoenent did mount");

    const { catId } = this.props.match.params;
    const {groupId} = this.props.match.params;
    this.props.getCategory(catId, this.props.history);
    this.props.getGroup(groupId);
  }

  render() {
    const { group } = this.props;
    const { category } = this.props;
    return (
      <div>
        <div class="bg-info py-2 text-white" id="dashboard-heading">
          <div class="container">
            <Link
              to={`/showcategoryitem/${category.id}`}
              class="text-white btn font-italic"
            >
              <h2 class="">{category.categoryName}</h2>
            </Link>
          </div>
        </div>
            <div class="row">
              <div class="col-md-12">
                <br />
                <br />
                  <GroupItemsAdminView key={group.id} group={group} />
              </div>
            </div>
      </div>
    );
  }
}
GroupAdminDashboard.propType = {
  getCategory: PropTypes.func.isRequired,
  getGroup: PropTypes.func.isRequired,
  category: PropTypes.object.isRequired,
  group: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  category: state.category.category,
  group: state.group.group,
});
export default connect(mapStateToProps, { getGroup, getCategory })(
  GroupAdminDashboard
);
