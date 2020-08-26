import React, { Component } from 'react';
import {connect} from "react-redux";
import {getGroup} from "../../action/groupAction";
import {getMeetups} from "../../action/meetupAction";
import  PropTypes  from "prop-types";
import image3 from "../../images/image3.jpg";
import MeetupUserView from '../Meetup/meetup_user_view';
import {getMembers} from "../../action/groupAction";
import {joinGroup} from "../../action/groupAction";
import ShowMember from '../Members/showMember';


class GroupItemContentView extends Component {

    constructor(){
        super();
        this.state = {
            showAboutSection : "show",
            showMeetingSection : "",
            showMemberSection : "",
        }
       this.handleShowAbout = this.handleShowAbout.bind(this);
       this.handleShowMeetingSection = this.handleShowMeetingSection.bind(this);
       this.handleShowMemberSection = this.handleShowMemberSection.bind(this);
    }

    componentDidMount(){
        const {groupId} = this.props.match.params;
        this.props.getGroup(groupId);
        this.props.getMeetups(groupId);
        this.props.getMembers(groupId);
    }

    handleShowAbout(){
        this.setState({
            showAboutSection: "show",
            showMeetingSection:"",
            showMemberSection : "",
    })
    }

    handleShowMeetingSection(){
        this.setState({
            showAboutSection: "",
            showMeetingSection:"show",
            showMemberSection : "",
    })
    }
    handleShowMemberSection(){
        this.setState({
            showAboutSection: "",
            showMeetingSection:"",
            showMemberSection : "show",
    })
    }
    
    render() {
        const {group} = this.props;
        const {meetups} = this.props.meetup;
        const {members} = this.props.member;
        return (
            <main id="main-section">
            { 
              //<!--Group Section-->
            }
             <section id="groupSection" className="mt-3 pt-5">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-md-5">
                           <img src={image3} alt="" className="img-fluid" />
                        </div>
                        <div className="col-lg-8 col-md-7 pl-5">
                            <h3 className="h3">{group.groupName}</h3>
                            <p>Rwanda - {group.location}</p>
                            <p>100 Members</p>
                            <h5 className="text-muted">Bella Amandine Muhorakeye <span className="font-italic">(Group Admin)</span></h5>
                        </div>
                    </div>
                  <button className="mt-md-2 btn btn-primary sticky-top">Join Group</button>
                  <hr />
          
                   { 
                     //<!--group menu-->
                    }
                   <div className="d-flex flex-row justify-content-center">
                     <div className="port-item" data-toggle="collapse" data-target="#about-section">
                       <a href="#about-section" className="btn btn-secondary mr-5" onClick={this.handleShowAbout} > About Us</a> 
                     </div>
                     <div className="port-item" data-toggle="collapse" data-target="#meeting-section">
                       <a href="#meeting-section" className="btn btn-secondary mr-5" onClick={this.handleShowMeetingSection}>Meetings</a>
                     </div>
                     <div className="port-item" data-toggle="collapse" data-target="#member-section">
                       <a href="#member-section" className="btn btn-secondary mr-5" onClick={this.handleShowMemberSection}>Members</a>
                     </div>
                   </div>
          
                   {
                     //<!--about section...description of the group-->
                     
                    }
          
                  <div id="about-section" className={"row  mt-3 collapse " + this.state.showAboutSection}>
                      <div className="col-md-8 ">
                          <h3 className="text-center">About This Group</h3>
                          <p className="lead">
                             {group.description}
                          </p>
                      </div>
                  </div>
              
                 {
                   // <!--Meeting Section-->
                  }
          
                  <div id="meeting-section" className={"mt-3 collapse " + this.state.showMeetingSection}>
                    <h3 className="text-center mb-3">Our Meetings</h3>
                    {
                      meetups.map((meetup) => (
                        <MeetupUserView key={meetup.id} meetup={meetup} />
                       ))
                    }
                  
                  </div>
          
               {
                 // <!--Members Section-->
                }
                <div className={"mt-5 collapse " + this.state.showMemberSection} id="member-section">
                  <h3>Our Members</h3>
                    {
                      members.map(member => (
                        <ShowMember key={member.id} member={member} />
                      ))
                    }
                    
                </div>
              
                </div>
              </section>
          
              </main>
        )
    }
}
GroupItemContentView.propTypes = {
    getGroup: PropTypes.func.isRequired,
    getMeetups: PropTypes.func.isRequired,
    getMembers: PropTypes.func.isRequired,
    joinGroup : PropTypes.object.isRequired,
    group: PropTypes.object.isRequired,
    meetup: PropTypes.object.isRequired,
    member: PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
    group: state.group.group,
    meetup: state.meetup,
    member: state.member,
}) 
export default connect(mapStateToProps,{getGroup,getMeetups,getMembers,joinGroup}) (GroupItemContentView);