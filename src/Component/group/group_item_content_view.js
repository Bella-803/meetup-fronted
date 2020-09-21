import React, { Component } from 'react';
import {connect} from "react-redux";
import {getGroup} from "../../action/groupAction";
import {getMeetups} from "../../action/meetupAction";
import  PropTypes  from "prop-types";
import defaultImage from "../../images/icon_image.png";
import MeetupUserView from '../Meetup/meetup_user_view';
import {getMembers} from "../../action/groupAction";
import {joinGroup} from "../../action/groupAction";
import ShowMember from '../Members/showMember';
import $ from "jquery";


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
       this.displaySuccessAlert = this.displaySuccessAlert.bind(this);
       this.isMember = this.isMember.bind(this);
    }

    componentDidMount(){
        const {groupId} = this.props.match.params;
       // const {id} = this.props.security.user;
        this.props.getGroup(groupId);
        this.props.getMeetups(groupId);
        this.props.getMembers(groupId);
    }

    componentDidUpdate(){
      this.props.getMembers(this.props.match.params.groupId);
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

    joinTheGroup(groupId) {
      this.props.joinGroup(groupId, this.props.history);
    }

    displaySuccessAlert(){
        return (
          <div class="alert alert-success" role="alert">
            <h4 class="alert-heading">Well done!</h4>
            <p>Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.</p>
            <hr />
            <p class="mb-0">Whenever you need to, be sure to use margin utilities to keep things nice and tidy.</p>
           </div>
        );
    }

    isMember(members) {
      const memberUsername = this.props.security.user.username;
      let check = 0;
       for(var i =0; i < members.length; i++){
         if(members[i].username === memberUsername){
           check ++;
           break;
         }
       }

       if(check !== 0){
         return true;
       }else{
         return false;
       }
    }
   
    
    render() {

      this.displaySuccessAlert();
        const {group} = this.props;
        const {meetups} = this.props.meetup;
        const {members} = this.props.member;
       

        let groupImage;
        if(group.photoPath == null){
          groupImage = defaultImage;
        }else {
          groupImage = group.photoPath;
        }

        let joinBtn;

        if(this.isMember(members)){
          joinBtn = "";
        }else {
          joinBtn = <button id="joinBtn" className="mt-md-2 btn btn-primary sticky-top" onClick={this.joinTheGroup.bind(this,group.id)}>Join Group</button>
        }


        return (
            <main id="main-section">
            { 
              //<!--Group Section-->
            }
             <section id="groupSection" className="mt-3 pt-5">
                <div className="container">
                    <div className="row text-center">
                        <div className="col-lg-4 col-md-5">
                           <img src={groupImage} alt="" className="img-fluid" />
                        </div>
                        <div className="col-lg-8 col-md-7 pl-5">
                            <h3 className="h3">{group.groupName}</h3>
                            <p><i className="fas fa-map-marker-alt"></i> Rwanda - {group.location}</p>
                            <p>{group.numberOfMembers} Members</p>
                            <h5 className="text-muted">{group.groupAdminName}<span className="font-italic">(Group Admin)</span></h5>
                        </div>
                    </div>
                      
                      {joinBtn}
                  
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
    joinGroup : PropTypes.func.isRequired,
    group: PropTypes.object.isRequired,
    meetup: PropTypes.object.isRequired,
    member: PropTypes.object.isRequired,
    security: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    group: state.group.group,
    meetup: state.meetup,
    member: state.member,
    security: state.security,
}) 
export default connect(mapStateToProps,{getGroup,getMeetups,getMembers,joinGroup}) (GroupItemContentView);