import React, { Component } from "react";
import AddMeeting from "../Meetup/addMeeting";
import GroupBreadcrumb from "../breadcrumb/group_breadcrumb";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getMeetups } from "../../action/meetupAction";
import MeetupItemGroupAdminView from "../Meetup/meetup_item_group_admin_view";
import { Link } from "react-router-dom";


class GroupAdminExploreDetails extends Component {
  componentDidMount() {
    const { groupId } = this.props.match.params;
    this.props.getMeetups(groupId);
  }

  render() {
    const { meetups } = this.props.meetup;
    const { catId } = this.props.match.params;
    const {groupId} = this.props.match.params;
    return (
      <div class="group">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <br />
              <GroupBreadcrumb
                groupId={groupId}
                categoryId={catId}
              />
              <hr />
              <br />

              <div class="container">
               {
                 // <AddMeeting history={this.props.history} match={this.props.match} />
                }
                <Link to={`/addmeeting/${groupId}/${catId}`} variant="success" className="btn btn-success mb-2">
                    <i className="fas fa-plus-circle"> New Meeting</i>
                </Link>
                <br />
                <table class="table table-striped">
                  <thead class="thead-dark">
                    <tr>
                      <th>Image</th>
                      <th>Meeting Title</th>
                      <th>Description</th>
                      <th>Date & Time</th>
                      <th>Location</th>
                      <th>No of attendees</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {meetups.map((meetup) => (
                      <MeetupItemGroupAdminView
                        key={meetup.id}
                        meetup={meetup}
                      />
                    ))}
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
GroupAdminExploreDetails.propTypes = {
  getMeetups: PropTypes.func.isRequired,
  meetup: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  meetup: state.meetup,
});
export default connect(mapStateToProps, { getMeetups})(
  GroupAdminExploreDetails
);
