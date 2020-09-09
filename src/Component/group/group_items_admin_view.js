import React, { Component } from "react";
import { Link } from "react-router-dom";
import defaultImage from "../../images/icon_image.png";
import { deleteGroup } from "../../action/groupAction";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {uploadGroupImage} from "../../action/groupAction";

class GroupItemsAdminView extends Component {

  constructor(){
    super();
    this.state = {
      selectedFile: "",
      msg: "",
    }
    this.onChangeFileHandler = this.onChangeFileHandler.bind(this);
    this.onEditClick = this.onEditClick.bind(this);
  }

  onDeleteClick = (id) => {
    this.props.deleteGroup(id)
  };

  onChangeFileHandler(e) {
    e.preventDefault();

    this.setState({
      selectedFile: e.target.files[0],
    })
 
  }

  onEditClick(e) {
    e.preventDefault();
     
    const groupId = this.props.group.id;
    const formData = new FormData();
    formData.append("file", this.state.selectedFile);

   const res = this.props.uploadGroupImage(groupId, formData);
   this.setState({
     msg: "Group Profile Successfully updated"
   })
  }

  render() {
    const { group } = this.props;
    const {category} = this.props;

    let groupImage;
    if(group.photoPath == null){
      groupImage = defaultImage;
    }else {
      groupImage = group.photoPath;
    }

    return (
      <div class="container">
        <h3 class="text-success">{this.state.msg}</h3>
        <div class="card card-body bg-light mb-3">
          <div class="row">
            <div class="col-sm-6 col-lg-3">
              <div class="card-img mb-3">
                <img src={groupImage} alt="" class="img-fluid" />
                <input type="file" name="file" onChange={this.onChangeFileHandler} />
                <button class="text-primary mt-2" onClick={this.onEditClick}>Edit Group Profile</button>
              </div>
            </div>
            <div class="col-sm-6 col-lg-6 col-md-4 col-8">
              <h3>{group.groupName}</h3>
              <p>
                {group.description}
                <br />
                <small class="text-info">{group.numberOfMembers} Members </small>
              </p>
            </div>
            <div class="col-sm-6 col-lg-3 d-lg-block ">
              <ul class="list-group">
                  <li class="list-group-item text-primary">
                    <Link class="text-info" to={`/groupadminexploredetails/${category.id}/${group.id}`} >
                      <i class="fa fa-flag-checkered pr-1"> Explore Group</i>
                    </Link>
                  </li>
                
                  <li class="list-group-item text-warning">
                    <Link class="text-warning" to={`/updateGroup/${category.id}/${group.id}`}>
                       <i class="fa fa-edit pr-1"> Update Group</i>
                   </Link>
                  </li>

                <li class="list-group-item text-danger">
                   <Link class="text-danger" onClick={this.onDeleteClick.bind(this, group.id)}>
                      <i class="fa fa-minus-circle pr-1"> Delete Group</i>
                  </Link>
                </li>

              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
GroupItemsAdminView.propTypes = {
  deleteGroup: PropTypes.func.isRequired,
  uploadGroupImage: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  category: state.category.category,
})
export default connect(mapStateToProps, { deleteGroup, uploadGroupImage })(GroupItemsAdminView);
