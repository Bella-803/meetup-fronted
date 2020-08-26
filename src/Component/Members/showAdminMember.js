import React, { Component } from 'react'

class ShowAdminMember extends Component {
    render() {
        const {member} = this.props;
        return (
            <tr>
              <td>1</td>
              <td>{member.fullname}</td>
              <td>{member.email}</td>
               <td>
                 <a href="#" class="btn text-danger">
                   <i class="fas fa-trash"> Remove Member</i>
                 </a>
               </td>
            </tr>
        )
    }
}
export default ShowAdminMember;