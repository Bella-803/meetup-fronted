import React, {Component} from "react";
import image3 from "../../images/image3.jpg";
import {Link} from "react-router-dom";

class MeetupUserView extends Component {

    render () {
        const {meetup} = this.props;
        return (
         <div className="card mb-2 bg-light">
            <div className="card-body">
              <div className="row">
                <div className="col-8">
                   <h5 className="card-title">{meetup.dateAndTime}</h5>
                   <h3>{meetup.meetingTitle}</h3>
                   <p className="lead">{meetup.description}</p>
       
                     <Link> <i className="fa fa-plus-circle fa-2x text-primary mr-3"></i></Link>
                     <Link> <i className="fa fa-times fa-2x text-danger"></i></Link>
                
                </div>
                <div className="col-4">
                  <img src={image3} alt="" className="img-fluid" />
                </div>
              </div>
             <p className="lead text-danger">
               Attended by 30
             </p>
            </div>
          </div>
            );
    }
}

export default MeetupUserView;