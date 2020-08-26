import React, { Component } from "react";
import { Link } from "react-router-dom";
import { deleteCategory } from "../../action/categoryActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class CategItem extends Component {
  onDeleteClick = (id) => {
    this.props.deleteCategory(id);
  };
  render() {
    const { category } = this.props;

    return (
      <tr>
        <td>#</td>
        <td>{category.categoryName}</td>
        <td>
          <p>{category.description}</p>
        </td>
        <td>{category.numberOfGroups}</td>
        <td>
          <Link to={`/updateCategory/${category.id}`} className="btn btn-info">
            <i className="fas fa-pen"> Edit</i>
          </Link>
          <Link className="btn btn-danger m-2" onClick={this.onDeleteClick.bind(this, category.id)} >
            <i className="fas fa-trash"> Delete</i>
          </Link>
        </td>
      </tr>
    );
  }
}
CategItem.propTypes = {
  deleteCategory: PropTypes.func.isRequired,
};
export default connect(null, { deleteCategory })(CategItem);
