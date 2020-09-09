import React, { Component } from 'react';
import {Link} from "react-router-dom";
import { deleteCategory } from "../../action/categoryActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import defaultImage from "../../images/icon_image.png";

class CategoryItemAdminView extends Component {

    onDeleteClick = (id) => {
        this.props.deleteCategory(id);
      };

    render() {
        const {category} = this.props;

        let categoryImage;

        if(category.photoPath === "" || category.photoPath == null){
          categoryImage = defaultImage;
        }else {
          categoryImage = category.photoPath;
        }

        console.log(category.photoPath);

        return (
            <tr>
              <td>
                <img src={categoryImage} alt="" width="80" height="80" />
              </td>
              <td>{category.categoryName}</td>
              <td>{category.description}</td>
              <td>{category.numberOfGroups}</td>
              <td>
                <Link to={`/updateCategory/${category.id}`} className="btn btn-outline-info">
                   <i className="fas fa-pen"> Edit</i>
                </Link>
              </td>
              <td>
                <Link className="btn btn-outline-danger m-2" onClick={this.onDeleteClick.bind(this, category.id)} >
                 <i className="fas fa-trash"> Delete</i>
                </Link>
              </td>
            </tr>
        )
    }
}
CategoryItemAdminView.propTypes = {
    deleteCategory: PropTypes.func.isRequired,
  };
export default connect(null, { deleteCategory }) (CategoryItemAdminView);