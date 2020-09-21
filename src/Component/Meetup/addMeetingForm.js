import React, { Component } from 'react';
import {Link} from "react-router-dom";
import classnames from "classnames";
import MeetupLinkInfo from './meetupLinkInfo';
import {createMeetup} from "../../action/meetupAction";
import PropTypes from "prop-types";
import {connect} from "react-redux";


class AddMeetingForm extends Component {
    constructor(){
        super();
        this.state = {
            meetingTitle: "",
            description: "",
            location: "",
            dateAndTime: "",
            errors: {},
            meetupType: "",
            showModal: false,
        }
        this.onChangeValue = this.onChangeValue.bind(this);
        this.onOnlineClick = this.onOnlineClick.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    onChangeValue(e) {
        this.setState({
            meetupType: e.target.value
        })
    }

    onOnlineClick() {
        this.setState({showModal: true})
    }

    onSubmit(e) {
        e.preventDefault();
        const {groupId} = this.props.match.params;
        const {catId} = this.props.match.params;
        const myDateandTime = this.state.dateAndTime.replace("T", " ");

        const newMeetup = {
            meetingTitle: this.state.meetingTitle,
            description: this.state.description,
            location: this.state.location,
            dateAndTime: myDateandTime,
        }
 
        
        this.props.createMeetup(newMeetup, groupId, catId, this.props.history);
    }

    render() {

        let location ;
        let linkInfo;

        if(this.state.showModal){
            linkInfo = <MeetupLinkInfo />
        }

        if(this.state.meetupType === "Physical"){
            location = <div className="form-group">
                       <label className="mb-1" for="location">Location</label>
                       <input type="text" id="location"
                              placeholder="Enter the location"
                              className="form-control form-control-lg py-4"
                              name="location"   
                              value={this.state.location}  
                              onChange={this.onChange}
                            />
                      </div>
        }else if(this.state.meetupType === "Online") {
            
            location = <div className="form-group">
                           <label className="mb-1" for="location">Meeting Url</label>
                           <input type="text" id="meetingUrl"
                                  placeholder="Paste your Google-meet link here"
                                  className="form-control form-control-lg py-4"
                                  name="location" 
                                  value={this.state.location}  
                                  onChange={this.onChange}  
                               />
                         </div>
        }

    return (
    <main>
      <div class="container">
          <div class="row justify-content-center">
              <div class="col-lg-7">
                 <div className="mt-3">
                   <Link > <i className="fa fa-arrow-left"></i> Back</Link>

                 </div>
                  <div class="card shadow-lg border-0 rounded-lg mt-3">
                      <div class="card-header"><h3 class="text-center font-weight-light my-4">Create Meetup Group</h3></div>
                      <div class="card-body">
                          <form onSubmit={this.onSubmit}>
                              <div class="form-column">
                                      <div class="form-group">
                                          <label class="mb-1" for="groupName">Meeting Title</label>
                                          <input id="meetingTitle"
                                                 type="text"
                                                 placeholder="Enter Meeting Title" 
                                                 className="form-control form-control-lg py-4"
                                                 name="meetingTitle"
                                                 value={this.state.meetingTitle}
                                                 onChange={this.onChange}
                                                 />
                                            
                                      </div>
                                    
                                       <div class="form-group">
                                          <label class="mb-1" for="meetupDascription">Meetup Description</label>
                                          <textarea id="meetupDescription"
                                                    type="text"
                                                    placeholder="Enter Meetup description" 
                                                    className="form-control form-control-lg py-4"
                                                    name="description"
                                                    value={this.state.description}
                                                    onChange={this.onChange}
                                        
                                            />
                                        
                                        </div>

                                        <div className="form-group" onChange={this.onChangeValue}>
                                          <div class="custom-control custom-radio custom-control-inline">
                                            <input type="radio" class="custom-control-input" id="customRadio" name="meetupType" value="Physical" />
                                            <label class="custom-control-label" for="customRadio">Physical Meetup</label>
                                          </div>
                                          <div class="custom-control custom-radio custom-control-inline">
                                            <input type="radio" class="custom-control-input" id="customRadio2" name="meetupType" value="Online" onClick={this.onOnlineClick} />
                                            <label class="custom-control-label" for="customRadio2">Online Meetup</label>
                                          </div>
                                        </div>
                                          {linkInfo}
                                          {location}
                                        
                                        <div className="form-group">
                                           <label className="mb-1" for="dateAndTime">Date and Time</label>
                                           <input type="datetime-local" id="dateAndTime"
                                                  className="form-control form-control-lg py-4"
                                                  name="dateAndTime"
                                                  value={this.state.dateAndTime}
                                                  onChange={this.onChange}
                                           />
                                        </div>

                              </div>
                             <input class="btn btn-block btn-success" type="submit" value="Submit" />
                          </form>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </main>
        )
    }
}
AddMeetingForm.propTypes = {
    createMeetup: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
    errors: state.errors,
})
export default connect(mapStateToProps, {createMeetup})(AddMeetingForm);