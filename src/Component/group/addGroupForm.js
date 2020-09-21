import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCategory } from "../../action/categoryActions";
import { createGroup } from "../../action/groupAction";
import {getSectors} from "../../action/sectorAction";
import classnames from "classnames";
import {Link} from "react-router-dom";

class AddGroupForm extends Component {
  constructor() {
    super();

    this.state = {
      groupName: "",
      description: "",
      sectorId: "",
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
    this.props.getSectors();
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const { catId } = this.props.match.params;
    const {sectorId} = this.state;
    const newGroup = {
      groupName: this.state.groupName,
      description: this.state.description,
    };

    this.props.createGroup(newGroup, catId, sectorId, this.props.history);

  }

  render() {
    const { categoryName } = this.props.category;
    const catId = this.props.match.params.catId;
    const {sectors} = this.props.sector;
    const {errors} = this.props;


    const myOption = sectors.map(sector => (
      <option value={sector.id}>{sector.name}</option>
    ))

    return (
    <main>
      <div class="container">
          <div class="row justify-content-center">
              <div class="col-lg-7">
                 <div className="mt-3">
                   <Link to={`/showcategoryitem/${catId}`}> <i className="fa fa-arrow-left"></i> Back</Link>

                 </div>
                  <div class="card shadow-lg border-0 rounded-lg mt-3">
                      <div class="card-header"><h3 class="text-center font-weight-light my-4">Create Meetup Group</h3></div>
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

                              <div class="form-group">
                                <label class="mb-1" for="groupName">Group Location</label>
                                <select name="sectorId" className="form-control form-control-lg" onChange={this.onChange}>
                                <option>---Select Sector---</option>
                                   { myOption }
                                </select>

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
AddGroupForm.propTypes = {
  getCategory: PropTypes.func.isRequired,
  createGroup: PropTypes.func.isRequired,
  getSectors: PropTypes.func.isRequired,
  category: PropTypes.object.isRequired,
  sector: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  category: state.category.category,
  sector: state.sector,
  errors: state.errors,
});
export default connect(mapStateToProps, { getCategory, createGroup, getSectors })(
  AddGroupForm
);
