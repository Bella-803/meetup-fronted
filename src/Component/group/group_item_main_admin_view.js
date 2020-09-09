import React, { Component } from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {deleteGroup} from "../../action/groupAction";
import {Link} from "react-router-dom";
import defaultImage from "../../images/icon_image.png";

 class GroupItemMainAdminView extends Component {

    onClickDelete(groupId) {
        this.props.deleteGroup(groupId);
    }
    render() {
        const {group} = this.props

        let groupImage;

        if(group.photoPath == null) {
            groupImage = defaultImage;
        }else {
            groupImage = group.photoPath;
        }
        return (
            <tr>
              <td>
                 <img src={groupImage} alt="group profile" className="img-fluid" width="100" height="100"/>
             </td>
              <td>{group.groupName}</td>
              <td>{group.description}</td>
              <td>{group.category.categoryName}</td>
              <td>{group.groupAdminName}</td>
              <td>{group.location}</td>
              <td>{group.numberOfMembers}</td>
              <td>
                <Link className="btn btn-outline-dark" onClick={this.onClickDelete.bind(this, group.id)}>Delete</Link>
              </td>
        </tr>
        )
    }
}
GroupItemMainAdminView.propTypes = {
    deleteGroup: PropTypes.func.isRequired,
}
export default connect(null,{deleteGroup})(GroupItemMainAdminView)