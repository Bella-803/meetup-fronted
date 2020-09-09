import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { updateGroup, getGroup } from "../../action/groupAction";
import { getCategory } from "../../action/categoryActions";
import classnames from "classnames";
import {uploadGroupImage} from "../../action/groupAction";

class UpdateGroupForm extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      groupName: "",
      description: "",
      photoPath: "",
      errors: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    const { id, groupName, description, photoPath } = nextProps.group;
    this.setState({
      id,
      groupName,
      description,
      photoPath,
    });
  }

  componentDidMount() {
    const { catId } = this.props.match.params;
    this.props.getCategory(catId, this.props.history);
    const { groupId } = this.props.match.params;
    this.props.getGroup(groupId);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const updatedGroup = {
      id: this.state.id,
      groupName: this.state.groupName,
      description: this.state.description,
      photoPath: this.state.photoPath,
    };
    const { catId } = this.props.match.params;

    this.props.updateGroup(updatedGroup, catId, this.props.history);
  }


  render() {
    const { categoryName } = this.props.category;
    const {errors} = this.props;


    return (
      <main>
      <div class="container">
          <div class="row justify-content-center">
              <div class="col-lg-7">
                  <div class="card shadow-lg border-0 rounded-lg mt-5">
                      <div class="card-header"><h3 class="text-center font-weight-light my-4">Edit Meetup Group</h3></div>
                      <div class="card-body">

                          <form onSubmit={this.onSubmit}>
                              <div class="form-column">
                                      <div class="form-group">
                                          <label class="mb-1" for="groupName">Group Name</label>
                                          <input id="groupName"
                                                 type="text"
                                                 placeholder="Enter group name" 
                                                 className={classnames("form-control form-control-lg py-4", {
                                                  "is-invalid": errors.groupName,
                                                })}
                                                name="groupName"
                                                value={this.state.groupName}
                                                onChange={this.onChange}
                                                 />
                                                 {errors.groupName && (
                                                  <div className="invalid-feedback">
                                                    {errors.groupName}
                                                  </div>
                                                )}
                                      </div>
                                      <div class="form-group">
                                        <label class="mb-1" for="category">Category Name</label>
                                         <input id="categoryName"
                                             type="text" 
                                             className={classnames("form-control form-control-lg py-4", {
                                              "is-invalid": errors.categoryName,
                                            })}
                                            name="categoryName"
                                            value={categoryName}
                                            disabled
                                             />
                                             
                                  </div>
                                  <div class="form-group">
                                  <label class="mb-1" for="groupName">Group Description</label>
                                  <textarea id="description"
                                         type="text"
                                         placeholder="Enter gorup description" 
                                         className={classnames("form-control form-control-lg py-4", {
                                          "is-invalid": errors.description,
                                        })}
                                        name="description"
                                        value={this.state.description}
                                        onChange={this.onChange}
                                         />
                                         {errors.description && (
                                          <div className="invalid-feedback">
                                            {errors.description}
                                          </div>
                                        )}
                              </div>
                              </div>
                             <input class="btn btn-block btn-info" type="submit" value="Save" />
                          </form>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </main>
    );
  }
}
UpdateGroupForm.propTypes = {
  getCategory: PropTypes.func.isRequired,
  getGroup: PropTypes.func.isRequired,
  updateGroup: PropTypes.func.isRequired,
  uploadGroupImage: PropTypes.func.isRequired,
  category: PropTypes.object.isRequired,
  group: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  category: state.category.category,
  group: state.group.group,
  errors: state.errors,
});
export default connect(mapStateToProps, { getCategory, updateGroup, getGroup, uploadGroupImage })(
  UpdateGroupForm
);
