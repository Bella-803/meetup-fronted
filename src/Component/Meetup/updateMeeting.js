import React, { Component } from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {getMeetup, updateMeetup} from "../../action/meetupAction";
import classnames from "classnames";

class UpdateMeeting extends Component {
    constructor(){
        super();
        this.state = {
         id: "",
         meetingTitle: "",
         description: "",
         location: "",
         dateAndTime: "",
         errors: {},
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {

        if(nextProps.errors){
            this.setState({errors: nextProps.errors})
        }

        const { id, meetingTitle, description, location, dateAndTime }  = nextProps.meetup;
        this.setState({
            id,
            meetingTitle,
            description,
            location,
            dateAndTime,
        })
    }
    componentDidMount(){
        const {meetupId} = this.props.match.params;
        this.props.getMeetup(meetupId)
    }
    onChange(e){
        this.setState({[e.target.name] : e.target.value})
    }
    onSubmit(e) {
        e.preventDefault();
        const {groupId} = this.props.match.params;
        const catId = this.props.meetup.meetupGroup.category.id;
        const myDateandTime = this.state.dateAndTime.replace("T", " ");

         const updatedMeetup = {
            id: this.state.id,
            meetingTitle: this.state.meetingTitle,
            description: this.state.description,
            location: this.state.location,
            dateAndTime: myDateandTime,
         }
       
         this.props.updateMeetup(updatedMeetup, groupId, catId,this.props.history);
    }

    render() {

      const {errors} = this.props;
        return (
            <main id="main-section">
            <div className="meetup_group">
              <div className="container">
                <div className="row">
                  <div className="col-md-8 m-auto">
                    <h5 className="display-4 text-center">Create Edit Group form</h5>
                    <hr />
                    <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                      <label for="meetingTitle">Meeting Title</label>
                      <input
                        id="meetingTitle"
                        type="text"
                        className={classnames("form-control", {
                          "is-invalid": errors.meetingTitle
                        })}
                        name="meetingTitle"
                        value={this.state.meetingTitle}
                        onChange={this.onChange}
                      />
                      { errors.meetingTitle && (
                        <div className="invalid-feedback">{errors.meetingTitle}</div>
                      )}
                    </div>
                    <div className="form-group">
                      <label for="meetingDescription">Meeting Description</label>
                      <textarea
                        id="meetingDescription"
                        name="description"
                        className={classnames("form-control", {
                          "is-invalid": errors.description
                        })}
                        value={this.state.description}
                        onChange={this.onChange}
                      ></textarea>
                      {errors.description && (
                        <div className="invalid-feedback">{errors.description}</div>
                      )}
                    </div>
                    <div className="form-group">
                      <label for="location">Location</label>
                      <input
                        type="text"
                        id="location"
                        name="location"
                        className={classnames("form-control", {
                          "is-invalid": errors.location
                        })}
                        value={this.state.location}
                        onChange={this.onChange}
                      />
                      {errors.location && (
                        <div className="invalid-feedback">{errors.location}</div>
                      )}
                    </div>
                    <div className="form-group">
                      <label for="dateAndTime">Date&Time</label>
                      <input
                        type="datetime-local"
                        id="dateAndTime"
                        name="dateAndTime"
                        className={classnames("form-control", {
                          "is-invalid": errors.dateAndTime
                        })}
                        value={this.state.dateAndTime}
                        onChange={this.onChange}
                      />
                      {errors.dateAndTime && (
                        <div className="invalid-feedback">{errors.dateAndTime}</div>
                      )}
                    </div>
                    <button className="btn btn-info btn-block">Save</button>
                  </form>
                  </div>
                </div>
              </div>
            </div>
          </main>
        )
    }
}
UpdateMeeting.propTypes = {
    getMeetup: PropTypes.func.isRequired,
    updateMeetup:PropTypes.func.isRequired,
    meetup: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    meetup: state.meetup.meetup,
    errors: state.errors,
})
export default connect(mapStateToProps,{getMeetup, updateMeetup})(UpdateMeeting);