import React, { Component } from "react";
import { Link } from "react-router-dom";
import {connect} from "react-redux";
import {getGroup} from "../../action/groupAction";
import PropTypes from "prop-types";


class GroupBreadcrumb extends Component {
  //distruct group id from props
componentDidMount(){
  const { groupId } = this.props;
  this.props.getGroup(groupId)
}

  render() {
    const { groupId } = this.props;
    const { categoryId } = this.props;
    const {group} = this.props;

    return (
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <Link
            to={`/groupadmindashboard/${groupId}/${categoryId}`}
            class="group-breadcrumb-link"
          >
            <h4>{group.groupName}</h4>
          </Link>
        </li>
        <li class="breadcrumb-item">
          <Link
            to={`/groupadminexploredetails/${categoryId}/${groupId}`}
            class="btn btn-md group-breadcrumb-link"
          >
            Meetings
          </Link>
        </li>
        <li class="breadcrumb-item">
          <Link
            to={`/members/${categoryId}/${groupId}`}
            class="btn btn-md group-breadcrumb-link"
          >
            Members
          </Link>
        </li>
      </ol>
    );
  }
}
GroupBreadcrumb.propTypes = {
  getGroup: PropTypes.func.isRequired,
  group: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  group: state.group.group,
})

export default connect(mapStateToProps,{getGroup})(GroupBreadcrumb);
