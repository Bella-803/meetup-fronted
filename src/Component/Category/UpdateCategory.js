import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCategory, createCategory } from "../../action/categoryActions";
import classnames from "classnames";

class UpdateCategory extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
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

    const { id, categoryName, description } = nextProps.category;
    this.setState({
      id,
      categoryName,
      description,
    });
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getCategory(id, this.props.history);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const updatedCategory = {
      id: this.state.id,
      categoryName: this.state.categoryName,
      description: this.state.description,
    };

    this.props.createCategory(updatedCategory, this.props.history);
  }

  render() {

    const { errors } = this.state;

    return (
      <div className="container">
      <div className="row mt-5">
      <div className="col-md-8 m-auto">
        <form className="form" onSubmit={this.onSubmit}>
          <div className="form-group">
            <label for="categoryName">Name</label>
            <input
              type="text"
              className={classnames("form-control", {
                "is-invalid": errors.categoryName,
              })}
              name="categoryName"
              value={this.state.categoryName}
              onChange={this.onChange}
            />
            {errors.categoryName && (
              <div className="invalid-feedback">{errors.categoryName}</div>
            )}
          </div>
          <div className="form-group">
            <label for="description">Description</label>
            <textarea
              id="description"
              name="description"
              className={classnames("form-control", {
                "is-invalid": errors.description,
              })}
              value={this.state.description}
              onChange={this.onChange}
            ></textarea>
            {errors.description && (
              <div className="invalid-feedback"> {errors.description} </div>
            )}
          </div>
          <input type="submit" className="btn btn-primary btn-block" />
        </form>
        </div>
        </div>
      </div>
    );
  }
}

UpdateCategory.propTypes = {
  getCategory: PropTypes.func.isRequired,
  createCategory: PropTypes.func.isRequired,
  category: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  category: state.category.category,
  errors: state.errors,
});
export default connect(mapStateToProps, { getCategory, createCategory })(
  UpdateCategory
);
