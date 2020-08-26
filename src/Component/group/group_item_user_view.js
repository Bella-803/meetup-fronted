import React, { Component } from "react";
import image1 from "../../images/image1.jpg";
import {Link} from "react-router-dom";

class GroupItemUserView extends Component {
  render() {
    const { group } = this.props;
    return (
      <div class="col-lg-3 col-md-4 mb-2">
        <div class="card text-left bg-light border-dark">
          <img src={image1} class="card-img-top" />

          <div class="card-body">
            <div class="card-title">
              <h4 class="font-weight-bold">{group.category.categoryName}</h4>
              <h3 class="h5 font-italic">{group.groupName}</h3>
              <p class="card-text text-muted align-bottom">180 Members</p>
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
