import React, { Component } from 'react';
import image1 from "../../images/image3.jpg";
import "../../App.css";
import image from "../../images/2_profile.jpg";

class ShowMember extends Component {

  
    render() {

      console.log(image);
        const{member} = this.props
        console.log(member.profilePhotoPath);
        return (
        <div>
          <div className="d-flex">
             <div className="align-self-start p-3">
               <img src={image} alt="" className="img-fluid img-member border rounded-circle" />
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