import React, { Component } from 'react';
import "../../dashboard_style.css";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createCategory } from "../../action/categoryActions";
import classnames from "classnames";
import { Link } from 'react-router-dom';

class AddCategoryForm extends Component {
    constructor() {
        super();
        this.state = {
          categoryName: "",
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
      }
      onChange(e) {
        this.setState({
          [e.target.name]: e.target.value,
        });
      }
    
      onSubmit(e) {
        e.preventDefault();
        const newCategory = {
          categoryName: this.state.categoryName,
          description: this.state.description,
        };
    
       this.props.createCategory(newCategory, this.props.history);
      }
    
    render() {
        const { errors } = this.state;
        return (
          <main>
            <div class="container">
              
                <div class="row justify-content-center">

                  <div className="col-lg-10">
                    <ol className="breadcrumb mt-3">
                      <li>
                          <Link> Dashboard </Link>
                      </li>
                    </ol>
                  </div>
                    <div class="col-lg-7">
                        <div class="card shadow-lg border-0 rounded-lg mt-2">
                            <div class="card-header"><h3 class="text-center font-weight-light my-4">Add New Category</h3></div>
                            <div class="card-body">
                                <form onSubmit={this.onSubmit}>
                                    <div class="form-column">
                                            <div class="form-group">
                                                <label class="mb-1" for="categoryName">Category Name</label>
                                                <input id="categoryName"
                                                       type="text"
                                                       placeholder="Enter category name" 
                                                       className={classnames("form-control form-control-lg py-4", {
                                                        "is-invalid": errors.categoryName,
                                                      })}
                                                      name="categoryName"
                                                      value={this.state.categoryName}
                                                      onChange={this.onChange}
                                                       />
                                                       {errors.categoryName && (
                                                        <div className="invalid-feedback">
                                                          {errors.categoryName}
                                                        </div>
                                                      )}
                                            </div>
                                            <div class="form-group">
                                                <label class="mb-1" for="description">Category Description</label>
                                                <textarea id="description" 
                                                          type="text" 
                                                          placeholder="Enter category description"
                                                          className={classnames("form-control form-control-lg py-4", {
                                                             "is-invalid": errors.description,
                                                           })}
                                                           name="description"
                                                           value={this.state.description}
                                                           onChange={this.onChange}
                                                      />
                                                      
                                                       {errors.description && (
                                                        <div className="invalid-feedback">{errors.description}</div>
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
        )
    }
}
AddCategoryForm.propType = {
  createCategory: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
}
const mapStateToProps = (state) => ({
    errors: state.errors,
});
export default connect(mapStateToProps, {createCategory}) (AddCategoryForm);