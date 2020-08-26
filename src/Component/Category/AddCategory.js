import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createCategory } from "../../action/categoryActions";
import classnames from "classnames";

class AddCategory extends Component {
  constructor() {
    super();
    this.state = {
      categoryName: "",
      description: "",
      errors: {},
      show: false,
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
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
   this.handleClose();
   document.location.reload(true);
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  render() {
    const { errors } = this.state;
    return (
      <div>
        <React.Fragment>
          <Button variant="primary" onClick={this.handleShow}>
            Add Category
          </Button>

          <Modal
            fade
            size="lg"
            show={this.state.show}
            onHide={this.handleClose}
          >
            <Modal.Header closeButton className="bg-info">
              <Modal.Title> Add Category </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form className="form-lg">
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
                    <div className="invalid-feedback">
                      {errors.categoryName}
                    </div>
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
                    <div className="invalid-feedback">{errors.description}</div>
                  )}
                </div>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <button className="btn btn-info" onClick={this.onSubmit}>
                Save
              </button>
            </Modal.Footer>
          </Modal>
        </React.Fragment>
      </div>
    );
  }
}
AddCategory.propTypes = {
  createCategory: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
});
export default connect(mapStateToProps, { createCategory })(AddCategory);
