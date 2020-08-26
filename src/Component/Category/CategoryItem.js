import React, { Component } from "react";
import AddCategory from "./AddCategory";
import CategItem from "./CategItem";

class CategoryItem extends Component {
  
  render() {
    const  {categories}  = this.props.category;

    return (
      <div class="card">
        <div class="card-header">
          <AddCategory history={this.props.history} />
        </div>
        <table class="table table-striped table-sm">
          <thead class="thead-dark">
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Description</th>
              <th>Groups</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <CategItem key={category.id} category={category} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
export default CategoryItem;

