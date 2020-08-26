import React, { Component } from "react";
import { Link } from "react-router-dom";
import GroupBreadcrumb from "../breadcrumb/group_breadcrumb";
import {getMembers} from "../../action/groupAction";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import ShowAdminMember from "./showAdminMember";

class Members extends Component {
  componentDidMount() {
    const { groupId } = this.props.match.params;
    this.props.getMembers(groupId);
  }
  render() {
    const {members} = this.props.member;
    const {groupId} = this.props.match.params;
    const {categoryId} = this.props.match.params;

    return (
      <div class="group">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <br />
              <GroupBreadcrumb groupId={groupId} categoryId={categoryId} />
              <hr />
              <br />

              <div class="container">
                <table class="table table-striped">
                  <thead class="thead-dark">
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      members.map(member => (
                        <ShowAdminMember key={member.id} member={member} />
                      ))

                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Members.propTypes = {
  getMembers: PropTypes.func.isRequired,
  member: PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
  member: state.member,
})
export default connect(mapStateToProps,{getMembers})(Members);
