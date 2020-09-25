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
        let location = meetup.location;
        let locationInfo;
        let attendMeetupBtn ;
        let showAttendance = "";
        
        if(location.startsWith('https')){
          locationInfo = <span className="font-weight-bold text-muted">, <i className="fa fa-video" aria-hidden="true"></i> Online Meetup </span>
          attendMeetupBtn = <a href={meetup.location} target="_blank" className="text-success font-weight-bold"><i className="fa fa-video" aria-hidden="true"></i> Click to Join Online Meetup</a>
        }
        else {
          showAttendance =  <p className="lead text-danger mt-3">
                                 Attended by {meetup.numberOfAttendees}
                             </p>
          locationInfo = <span className="font-weight-bold text-muted">, <i className="fas fa-map-marker-alt"></i> {meetup.location} </span>;
          attendMeetupBtn =  <div>
                                 <Link onClick={this.attendMeet.bind(this, meetup.id)}> <i className="fa fa-plus-circle fa-2x text-primary mr-3"></i></Link>
                                  <Link onClick={this.cancelYourMeetup.bind(this, meetup.id)}> <i className="fa fa-times fa-2x text-danger"></i></Link>
                             </div>
        }

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
                   <h5 className="card-title">{meetup.dateAndTime} <strong>{locationInfo}</strong></h5>
                   <h3>{meetup.meetingTitle}</h3>
                   <p className="lead">{meetup.description}</p>
                     
                     <p className="lead mt-2 mb-2">
                         {attendMeetupBtn}
                     </p>

                    {showAttendance}

                </div>

                <div className="col-4">
                  <img src={meetupImage} alt="" className="img-fluid" width="300" height="300"/>
                </div>
              </div>
            
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