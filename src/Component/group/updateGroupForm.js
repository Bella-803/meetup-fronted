import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { updateGroup, getGroup } from "../../action/groupAction";
import { getCategory } from "../../action/categoryActions";
import classnames from "classnames";

class UpdateGroupForm extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      groupName: "",
      description: "",
      errors: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    const { id, groupName, description } = nextProps.group;
    this.setState({
      id,
      groupName,
      description,
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
    };
    const { catId } = this.props.match.params;
    this.props.updateGroup(updatedGroup, catId, this.props.history);
  }

  render() {
    const { categoryName } = this.props.category;
    const {errors} = this.props;

    return (
      <main id="main-section">
        <div className="meetup_group">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h5 className="display-4 text-center">Edit Group form</h5>
                <hr />
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      className={classnames("form-control form-control-lg ", {
                        "is-invalid": errors.groupName
                      })}
                      placeholder="Group Name"
                      name="groupName"
                      value={this.state.groupName}
                      onChange= {this.onChange}
                    />
                    {errors.groupName && (
                      <div className="invalid-feedback">{errors.groupName}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Category"
                      name="categoryName"
                      value={categoryName}
                      disabled
                    />
                  </div>

                  <div className="form-group">
                    <textarea
                      className={classnames("form-control form-control-lg ", {
                        "is-invalid": errors.description
                      })}
                      placeholder="Group Description"
                      name="description"
                      value={this.state.description}
                      onChange={this.onChange}
                    ></textarea>
                    {errors.description && (
                      <div className="invalid-feedback">{errors.description}</div>
                    )}
                  </div>
                  <h6>Group Photo</h6>
                  <div className="form-group">
                    <input
                      type="file"
                      className="form-control form-control-lg"
                      name="groupPhoto"
                    />
                  </div>

                  <button className="btn btn-danger btn-block mt-4">
                    Save
                  </button>
                </form>
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
  category: PropTypes.object.isRequired,
  group: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  category: state.category.category,
  group: state.group.group,
  errors: state.errors,
});
export default connect(mapStateToProps, { getCategory, updateGroup, getGroup })(
  UpdateGroupForm
);
