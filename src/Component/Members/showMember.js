import React, { Component } from 'react';
import image1 from "../../images/image3.jpg";
import "../../App.css";
import defaultImage from "../../images/default_image.jpg";

class ShowMember extends Component {

  
    render() {

        const{member} = this.props;

        let memberImage;

        if(member.profilePhotoPath == null){
          memberImage = defaultImage;
        }else {
          memberImage = member.profilePhotoPath;
        }
        return (
        <div>
          <div className="d-flex">
             <div className="align-self-start p-3">
               <img src={memberImage} alt="" className="img-fluid img-member border rounded-circle" />
             </div>
             <div className="align-self-center">
               <h5>{member.fullname}</h5>
             </div>
          </div>
          <hr />
        </div>
        )
    }
}
export default ShowMember;