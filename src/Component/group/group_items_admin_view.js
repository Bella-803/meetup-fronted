import React, { Component } from "react";
import { Link } from "react-router-dom";
import image1 from "../../images/image3.jpg";
import { deleteGroup } from "../../action/groupAction";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class GroupItemsAdminView extends Component {
  onDeleteClick = (id) => {
    this.props.deleteGroup(id)
  };

  render() {
    const { group } = this.props;

    return (
      <div class="container">
        <div class="card card-body bg-light mb-3">
          <div class="row">
            <div class="col-sm-6 col-lg-3">
              <div class="card-img mb-3">
                <img src={image1} alt="" class="img-fluid" />
              </div>
              <input type="file" name="Change Group Profile" id="" />
            </div>
            <div class="col-sm-6 col-lg-6 col-md-4 col-8">
              <h3>{group.groupName}</h3>
              <p>
                {group.description}
                <br />
                <small class="text-info">0 Members </small>
              </p>
            </div>
            <div class="col-sm-6 col-lg-3 d-lg-block ">
              <ul class="list-group">
                <Link
                  to={`/groupadminexploredetails/${group.category.id}/${group.id}`}
                >
                  <li class="list-group-item text-primary">
                    <i class="fa fa-flag-checkered pr-1">Explore Group</i>
                  </li>
                </Link>
                <Link to={`/updateGroup/${group.category.id}/${group.id}`}>
                  <li class="list-group-item text-warning">
                    <i class="fa fa-edit pr-1">Update Group</i>
                  </li>
                </Link>
                <Link onClick={this.onDeleteClick.bind(this, group.id)}>
                  <li class="list-group-item text-danger">
                    <i class="fa fa-minus-circle pr-1">Delete Group</i>
                  </li>
                </Link>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
GroupItemsAdminView.propTypes = {
  deleteGroup: PropTypes.func.isRequired,
};
export default connect(null, { deleteGroup })(GroupItemsAdminView);
