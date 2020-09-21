import React, { Component } from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {uploadUserProfile, getUser} from "../../action/userAction";
import defaultImage from "../../images/default_image.jpg"

class UserProfile extends Component {

    constructor(){
        super();
        this.state = {
            selectedFile: "",
            msg: "",
        }
        this.onChange = this.onChange.bind(this);
        this.onUploadClick = this.onUploadClick.bind(this);
    }

    componentDidMount(){
        const userId = this.props.security.user.id
        this.props.getUser(userId);
    }

    onChange(e){
        this.setState({
            selectedFile: e.target.files[0],
        })
    }
    onUploadClick(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', this.state.selectedFile);
        this.props.uploadUserProfile(formData);
        
    }

    render() {
        let myImage;
        const {member} = this.props;

        if(member.profilePhotoPath == "" || member.profilePhotoPath == null) {
          myImage = defaultImage;
        }
        else {
            myImage = member.profilePhotoPath
        }

        return (
            <section id="profile">
            <div class="container">
            
              <div class="row">
                <div class="col-md-9 mt-5">
                  <div class="card">
                    <div class="card-header">
                      <h4>Your Account</h4>
                    </div>
                    <div class="card-body">
                      <form>
                        <div class="form-group">
                          <label for="name">Fullname</label>
                         <input type="text" class="form-control" value={member.fullname} />
                        </div>
                         <div class="form-group">
                          <label for="email">Email</label>
                         <input type="email" class="form-control" value={member.email} />
                        </div>
                        <div class="form-group">
                        <label for="name">Username</label>
                       <input type="text" class="form-control" value={member.username} />
                      </div>
                         
                      </form>
                    </div>
                  </div>
                </div>
      
                <div class="col-md-3 mt-3">
                   <h3>Your Profile Picture</h3>
                   <img src={myImage} alt="" class="img-fluid d-block mb-3" />
                   <input type="file" name="file" onChange={this.onChange}/>
                   <button class="btn btn-primary btn-block mt-2" onClick={this.onUploadClick}>Edit Image</button>
                </div>
              </div>
            </div>
          </section>
        )
    }
}
UserProfile.propTypes = {
    security: PropTypes.object.isRequired,
    getUser: PropTypes.func.isRequired,
    uploadUserProfile: PropTypes.func.isRequired,
    member: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    security: state.security,
    member: state.member.member,
})
export default connect(mapStateToProps, {uploadUserProfile, getUser})(UserProfile);