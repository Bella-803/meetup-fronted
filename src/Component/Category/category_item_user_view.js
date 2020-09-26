import React, { Component } from "react";
import { Link } from "react-router-dom";
import GroupItemUserView from "../group/group_item_user_view";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCategory } from "../../action/categoryActions";
import { getGroups } from "../../action/groupAction";
import defaultImage from "../../images/icon_image.png";

class CategoryItemUserView extends Component {
  constructor(){
    super();
    this.state = {
      searchText: "",
      filteredGroup: [],
    }
    this.onChange = this.onChange.bind(this);
    this.onSearchClick = this.onSearchClick.bind(this);
  }
  componentDidMount() {
    const { catId } = this.props.match.params;
    this.props.getCategory(catId, this.props.history);
    this.props.getGroups(catId);
  }

  onChange(e) {
    this.setState({
      searchText: e.target.value,
    })
  }

  onSearchClick(e) {
    e.preventDefault();
    const { groups } = this.props.group;
    const newGroups = groups.filter(group => {
      return group.groupName.toLowerCase().includes(this.state.searchText.toLocaleLowerCase());
    })

    this.setState({
      filteredGroup : newGroups,
    })
  }

  render() {
    const { category } = this.props;
    const { groups } = this.props.group;

    let categoryImage;

    if(category.photoPath == null){
      categoryImage = defaultImage;
    }else {
      categoryImage = category.photoPath;
    }

    let groupsContent;

    if(this.state.searchText === ""){
      groupsContent = groups
    }else {
      groupsContent = this.state.filteredGroup;
    }

    return (
      <div className="container">
        <section id="categorySection" class="pt-5">
          <div class="row">
            <div class="col-lg-5 col-md-6">
              <img src={categoryImage} alt="" class="img-fluid" class="img-fluid"/>
            </div>
            <div class="col-lg-7 col-md-6 pl-5">
              <h3 class="h3">{category.categoryName}</h3>
              <p class="mb-5">{category.description}</p>
              <Link
                to={`/addGroup/${category.id}`}
                class="btn btn-outline-primary btn-lg"
              >
                Create Group
              </Link>
            </div>
          </div>
          <br />
          <hr />
        </section>
        <div className="container">
          <section id="group-section" class=" mb-5">
            <div className="container">
              <h3 class="h4">Some Groups</h3>
              
                <div>
                  <h5 class="mb-3 text-muted font-italic">
                    Groups in this category
                  </h5>
                </div>

                <div class="row mb-3">
                <div class="col-md-6 ml-auto">
                  <div class="input-group">
                    <input
                      type="text"
                      name="searchText"
                      class="form-control"
                      placeholder="Search Group"
                      onChange={this.onChange}
                    />
                    <div class="input-group-append">
                      <button class="btn btn-info" onClick={this.onSearchClick}>Search</button>
                    </div>
                  </div>
                </div>
                </div>
               
              <div class="row">
                {groupsContent.map((group) => (
                  <GroupItemUserView key={group.id} group={group}/>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}
CategoryItemUserView.propTypes = {
  getCategory: PropTypes.func.isRequired,
  getGroups: PropTypes.func.isRequired,
  category: PropTypes.object.isRequired,
  groups: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  category: state.category.category,
  group: state.group,
});
export default connect(mapStateToProps, { getCategory, getGroups })(
  CategoryItemUserView
);
