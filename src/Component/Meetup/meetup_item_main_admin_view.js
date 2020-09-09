import React, { Component } from 'react';


 class MeetupItemMainAdminView extends Component {
    render() {

        const {meetup} = this.props
        return (
         <tr>
            <td>{meetup.id}</td>
            <td>{meetup.meetingTitle}</td>
            <td>{meetup.description}</td>
            <td>{meetup.meetupGroup.groupName}</td>
            <td>{meetup.dateAndTime}</td>
            <td>{meetup.location}</td>
            <td>{meetup.numberOfAttendees}</td>
         </tr>
        )
    }
}
export default MeetupItemMainAdminView;