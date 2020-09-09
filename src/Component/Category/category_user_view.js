import React, { Component } from 'react';
import {Link} from "react-router-dom";
import defaultImage from "../../images/icon_image.png";

class CategoryUserView extends Component {
    render() {

      const {category} = this.props
      let categoryImage;
      if(category.photoPath == null){
        categoryImage = defaultImage;
      }else {
        categoryImage = category.photoPath
      }

        return (
            <div class="col-md-4 col-lg-3 mb-3">
                <div class="card text-left bg-light card-category">
                  <Link to={`/showcategoryitem/${category.id}`} class="a-category">
                    <img
                      src={categoryImage}
                      className="card-img-top img-fluid"
                      alt="pic of this category"
                    />
                    <div class="card-body">
                      <div class="card-title">
                        <h4>{category.categoryName}</h4>
                        <p class="card-text text-muted desc-text">{category.description}</p>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
        )
    }
}
export default CategoryUserView;