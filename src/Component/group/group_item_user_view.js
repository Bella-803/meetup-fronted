import React, { Component } from "react";
import {Link} from "react-router-dom";
import defaultImage from "../../images/icon_image.png";

class GroupItemUserView extends Component {
  render() {
    const { group } = this.props;

    let groupImage;

    if(group.photoPath == null){
      groupImage = defaultImage;
    }else {
      groupImage = group.photoPath;
    }

    return (
      <div class="col-lg-3 col-md-4 mb-2">
        <div class="card text-left bg-light">
          <img src={groupImage} class="card-img-top"/>

          <div class="card-body">
            <div class="card-title">
              <h4 class="font-weight-bold">{group.category.categoryName}</h4>
              <h3 class="h5 font-italic">{group.groupName}</h3>
              <p class="card-text text-muted align-bottom">{group.numberOfMembers} Members</p>
            </div>
          </div>

          <div class="card-footer">
            <div class="float-right">
              <Link to={`/groupitemcontentuserview/${group.id}`} class="btn btn-info">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default GroupItemUserView;
