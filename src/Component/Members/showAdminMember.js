import React, { Component } from 'react';
import {Link} from "react-router-dom";
import {removeMember} from "../../action/groupAction";
import {connect} from "react-redux";
import PropTypes from "prop-types";


class ShowAdminMember extends Component {

  onRemoveClick = (groupId, userId) => {
      this.props.removeMember(groupId, userId);
  }
    render() {
        const member = this.props.member[1];
        const groupId = this.props.member[0];

        return (
            <tr>
              <td>#</td>
              <td>{member.fullname}</td>
              <td>{member.email}</td>
               <td>
                 <Link onClick={this.onRemoveClick.bind(this, groupId, member.id)} className="btn text-danger">
                   <i class="fas fa-trash"> Remove Member</i>
                 </Link>
               </td>
            </tr>
        )
    }
}
ShowAdminMember.propTypes = {
  removeMember: PropTypes.func.isRequired,
}
export default connect(null, {removeMember})(ShowAdminMember);