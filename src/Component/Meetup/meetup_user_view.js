import React, {Component} from "react";
import {Link} from "react-router-dom";
import {attendMeetup, cancelMeetup} from "../../action/meetupAction";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import defaultImage from "../../images/icon_image.png";


class MeetupUserView extends Component {

  attendMeet(meetupId) {
    this.props.attendMeetup(meetupId);
    alert("You have successfully confirm your attendance");
  }

  cancelYourMeetup(meetupId) {
    this.props.cancelMeetup(meetupId);
    alert("You have successfully cancelled your attendance");
  }

    render () {
        const {meetup} = this.props;

        let meetupImage;

        if(meetup.photoPath == null){
          meetupImage = defaultImage;
        }else {
          meetupImage = meetup.photoPath;
        }

        return (
         <div className="card mb-2 bg-light">
            <div className="card-body">
              <div className="row">
                <div className="col-8">
                   <h5 className="card-title">{meetup.dateAndTime}</h5>
                   <h3>{meetup.meetingTitle}</h3>
                   <p className="lead">{meetup.description}</p>
       
                     <Link onClick={this.attendMeet.bind(this, meetup.id)}> <i className="fa fa-plus-circle fa-2x text-primary mr-3"></i></Link>
                     <Link onClick={this.cancelYourMeetup.bind(this, meetup.id)}> <i className="fa fa-times fa-2x text-danger"></i></Link>
                
                </div>
                <div className="col-4">
                  <img src={meetupImage} alt="" className="img-fluid" />
                </div>
              </div>
             <p className="lead text-danger">
               Attended by {meetup.numberOfAttendees}
             </p>
            </div>
          </div>
            );
    }
}
MeetupUserView.propTypes = {
  attendMeetup : PropTypes.func.isRequired,
  cancelMeetup : PropTypes.func.isRequired,
}
export default connect(null, {attendMeetup, cancelMeetup}) (MeetupUserView);