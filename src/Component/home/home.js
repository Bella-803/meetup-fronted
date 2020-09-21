import React, { Component } from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {getCategories} from "../../action/categoryActions";
import CategoryUserView from '../Category/category_user_view';
import {getUsersGroup} from "../../action/userAction";
import GroupItemUserView from '../group/group_item_user_view';

class Home extends Component {

  constructor(){
    super();
    this.state = {
      searchText: "",
      filteredCategories: [],
    }
    this.onChange = this.onChange.bind(this);
    this.onSearchClick = this.onSearchClick.bind(this);
  }

    componentDidMount(){
        this.props.getCategories();
        if(this.props.security.validToken){
          if(this.props.security.user.role !== 'ADMIN'){
            this.props.getUsersGroup();
          }
          else {
            this.props.history.push("/admin");
          }
        }
    }

    onChange(e) {
      this.setState({
        searchText: e.target.value,
      })
    }

    onSearchClick(e) {
      e.preventDefault();
      const {categories} = this.props.category;
      const newCategs = categories.filter(category => {
        return category.categoryName.toLowerCase().includes(this.state.searchText.toLocaleLowerCase())
      })

      this.setState({
        filteredCategories : newCategs,
      })
    }

    showAlert(){
      window.alert("Please Select Category First");
    }

    render() {
        const {categories} = this.props.category;
       const {groups} = this.props.group;

        let groupContent;
        const groupAlgorithm = (groups) => {
          if(groups.length < 1){
            return (
              <div className="alert alert-danger text-center mx-auto" role="alert">
                 You didn't join any group yet
              </div>
            )
          }
          else {
            return groupItem;
          }
        }

        const groupItem = groups.map(group => (
                               <GroupItemUserView key={group.id} group={group} />
                         ))
      

        groupContent = groupAlgorithm(groups);

        let categoriesContent;
        if(this.state.searchText === ""){
          categoriesContent = categories
        }else {
          categoriesContent = this.state.filteredCategories
        }

        return (
            <div>
            {
              // <!--heading-->
            }
            <section id="home-heading-section">
              <div className="container">
                <div className="dark-overlay">
                  <div className="row py-5">
                    <div className="col-4 text-white d-flex flex-column align-items-center mx-auto text-center py-5">
                      <h1 className="h1 pt-5">Share and Learn</h1>
                      <p className="lead pt-4">
                          Increase your knowlegde and Skills by working with other like-minded
                      </p>
                      <a href="#category-section" className="btn btn-lg btn-success" onClick={this.showAlert.bind(this)}>Start New Group</a>
                    </div>
                  </div>
                </div>
             </div>
           </section>
            {
              //<!--specific groups section-->
            }
            <section id="your-group-section">
              <div class="container">
                <h3 class="h3 mb-3 pt-4">Your Groups</h3>
                <div class="row pt-4 pb-4">
                   {
                     groupContent
                   }
                </div>
               
              </div>
            </section>
    
            {
              //<!--Category Section-->
            }
    
            <section id="category-section" class="bg-white">
              <div class="container">
                <h3 class="h3 mb-3 pt-4">Categories</h3>
                <p className="font-italic">Find Groups In Category that interest you</p>
              <div class="row">
                <div class="col-md-6 ml-auto">
                  <div class="input-group">
                    <input
                      type="text"
                      name="searchText"
                      class="form-control"
                      placeholder="Search Category"
                      onChange={this.onChange}
                    />
                    <div class="input-group-append">
                      <button class="btn btn-info" onClick={this.onSearchClick}>Search</button>
                    </div>
                  </div>
                </div>
                </div>

                <div class="row pt-4 pb-4">
                  {categoriesContent.map((category) => (
                    <CategoryUserView key={category.id} category={category} />
                  ))}
                </div>
               
              </div>
            </section>
            
            
            </div>
        )
    }
}
Home.propTypes = {
    getCategories: PropTypes.func.isRequired,
    category: PropTypes.object.isRequired,
    security: PropTypes.object.isRequired,
    group: PropTypes.object.isRequired
}
const mapStateToProps = (state) => ({
    category: state.category,
    security: state.security,
    group: state.group
})
export default connect(mapStateToProps, {getCategories, getUsersGroup})(Home);