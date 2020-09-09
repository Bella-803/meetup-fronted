import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCategory, createCategory } from "../../action/categoryActions";
import classnames from "classnames";
import defaultImage from "../../images/icon_image.png";
import {uploadCategoryImage} from "../../action/categoryActions";

class UpdateCategory extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      categoryName: "",
      description: "",
      photoPath: "",
      selectedFile: "",
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeFileHandler = this.onChangeFileHandler.bind(this);
  }

  componentWillReceiveProps(nextProps) {
   
     if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    const { id, categoryName, description, photoPath } = nextProps.category;
    this.setState({
      id,
      categoryName,
      description,
      photoPath,
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

  onChangeFileHandler(e) {
    e.preventDefault();
    this.setState({
      selectedFile: e.target.files[0],
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const updatedCategory = {
      id: this.state.id,
      categoryName: this.state.categoryName,
      description: this.state.description,
      photoPath: this.state.photoPath,
    };

    const formData = new FormData();
    formData.append("file", this.state.selectedFile);

    if(this.state.selectedFile !== ""){
      this.props.uploadCategoryImage(formData, this.state.id);
    }
   
    this.props.createCategory(updatedCategory, this.props.history);
    
  }

  render() {

    const { errors } = this.state;
    const {category} = this.props;

    let categoryImage;

    if(category.photoPath == null) {
       categoryImage = defaultImage;
    }else {
      categoryImage = category.photoPath
    }

    return (
      <main>
      <div class="container">
          <div class="row justify-content-center">
              
              <div class="col-lg-7">
                  <div class="card shadow-lg border-0 rounded-lg mt-5">
                      <div class="card-header"><h3 class="text-center font-weight-light my-4">Add New Category</h3></div>
                      
                      <div class="card-body">
                      <div class="card-img-top">
                         <img src= {categoryImage} alt="" width="100" height="100" class="mr-2 mb-3"/>
                         <input type="file" name="file" onChange={this.onChangeFileHandler}/>
                      </div>
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
                                                 >
                                                 </textarea>
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
    );
  }
}

UpdateCategory.propTypes = {
  getCategory: PropTypes.func.isRequired,
  createCategory: PropTypes.func.isRequired,
  uploadCategoryImage: PropTypes.func.isRequired,
  category: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  category: state.category.category,
  errors: state.errors,
});
export default connect(mapStateToProps, { getCategory, createCategory, uploadCategoryImage })(
  UpdateCategory
);
