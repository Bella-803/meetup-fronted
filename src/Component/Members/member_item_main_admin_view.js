import React, { Component } from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {deleteUser} from "../../action/userAction";
import {Link} from "react-router-dom";

class MemberItemMainAdminView extends Component {
    onDeleteClick(userId) {
        this.props.deleteUser(userId);
    }
    render() {
        const {member} = this.props
        return (
         <tr>
              <td>{member.id}</td>
              <td>{member.fullname}</td>
              <td>{member.email}</td>
              <td>{member.eRoles}</td>
              <td>{member.numberOfCreatedGroups}</td>
              <td>
                <Link className="btn btn-outline-dark" onClick={this.onDeleteClick.bind(this, member.id)}>Delete User</Link>
              </td>
         </tr>
        )
    }
}
MemberItemMainAdminView.propTypes = {
    deleteUser: PropTypes.func.isRequired
}
export default connect(null, {deleteUser})(MemberItemMainAdminView);
