import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCategory } from "../../action/categoryActions";
import { createGroup } from "../../action/groupAction";
import classnames from "classnames";

class AddGroupForm extends Component {
  constructor() {
    super();

    this.state = {
      groupName: "",
      description: "",
      errors: "",
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.errors){
      this.setState({errors: nextProps.errors})
    }
  }

  componentDidMount() {
    const { catId } = this.props.match.params;
    this.props.getCategory(catId, this.props.history);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const { catId } = this.props.match.params;
    const newGroup = {
      groupName: this.state.groupName,
      description: this.state.description,
    };

    this.props.createGroup(newGroup, catId, this.props.history);
  }

  render() {
    const { categoryName } = this.props.category;
    const {errors} = this.props
    return (
      <main id="main-section">
        <div className="meetup_group">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h5 className="display-4 text-center pt-5">Create Meetup Group</h5>
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
                      onChange={this.onChange}
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

                  <button className="btn btn-info btn-block">Save</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}
AddGroupForm.propTypes = {
  getCategory: PropTypes.func.isRequired,
  createGroup: PropTypes.func.isRequired,
  category: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  category: state.category.category,
  errors: state.errors,
});
export default connect(mapStateToProps, { getCategory, createGroup })(
  AddGroupForm
);
