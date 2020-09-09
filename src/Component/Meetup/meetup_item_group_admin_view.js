import React, { Component } from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {deleteMeetup} from "../../action/meetupAction";
import {Link} from "react-router-dom";

class MeetupItemGroupAdminView extends Component {
  
  onDeleteClick = (meetupId) => {
    this.props.deleteMeetup(meetupId);
  }
  render() {
    const { meetup } = this.props;
    
    return (
      <tr>
        <td>
          <img src={meetup.photoPath} alt="meetup-profile" className="rounded-circle" width="75" height="75"/>
        </td>
        <td>{meetup.meetingTitle}</td>
        <td>
          <p>
           {meetup.description}.
          </p>
        </td>
        <td>{meetup.dateAndTime}</td>
        <td>{meetup.location}</td>
        <td>{meetup.numberOfAttendees}</td>
        <td>
          <Link to={`/updatemeeting/${meetup.meetupGroup.id}/${meetup.id}`} class="btn text-warning">
            <i class="fas fa-pen"> Edit</i>
          </Link>
          <Link  class="btn text-danger" onClick={this.onDeleteClick.bind(this, this.props.meetup.id)}>
            <i class="fas fa-trash"> Delete</i>
          </Link>
        </td>
      </tr>
    );
  }
}
MeetupItemGroupAdminView.propTypes = {
  deleteMeetup: PropTypes.func.isRequired,
}
export default connect(null,{deleteMeetup})(MeetupItemGroupAdminView);
