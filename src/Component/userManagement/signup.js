import React, {Component} from "react";
import { Link } from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {signup} from "../../action/securityAction";
import classnames from "classnames";

class Signup extends Component {
  constructor(){
    super();
    this.state = {
      fullname: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
      errors: {},
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount(){
    if(this.props.security.validToken){
      this.props.history.push("/home");
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.errors){
      this.setState({ errors: nextProps.errors})
    }
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }
  onSubmit(e) {
    e.preventDefault();
    const newUser = {
      fullname: this.state.fullname,
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
    }
     this.props.signup(newUser,this.props.history);
  }
    render() {
      const {errors} = this.state
    return (
   <section id="signup" className="mt-3 pt-5">
      <div className="container">
        <div className="row">
          <div className="col-md-6 mx-auto">
            <div className="card bg-white text-center card-form card-signup">
              <div className="card-body">
                <h3>Sign Up</h3>
                <p>Please fill out the form to create an account
                <p classNameName="text-muted"><em>Already have an account? <Link to="/login">Log In</Link></em></p>
                </p>
                
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      name="fullname"
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.fullname
                      })}
                      placeholder="Full Name"
                      value={this.state.fullname}
                      onChange= {this.onChange}
                    />
                    {
                      errors.fullname && (
                        <div className="invalid-feedback">
                          {errors.fullname}
                        </div>
                      )
                    }
                  </div>

                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.email
                      })}
                      placeholder="Email"
                      value={this.state.email}
                      onChange={this.onChange}
                    />
                    {
                      errors.email && (
                        <div className="invalid-feedback">
                          {errors.email}
                        </div>
                      )
                    }
                  </div>

                  <div className="form-group">
                    <input
                      type="text"
                      name="username"
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.username
                      })}
                      placeholder="Username"
                      value={this.state.username}
                      onChange={this.onChange}
                    />
                    {
                      errors.username && (
                        <div className="invalid-feedback">
                          {errors.username}
                        </div>
                      )
                    }
                  </div>

                  <div className="form-group">
                    <input
                      type="password"
                      name="password"
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.password
                      })}
                      placeholder="Password"
                      value={this.state.password}
                      onChange={this.onChange}
                    />
                    {
                      errors.password && (
                        <div className="invalid-feedback">
                          {errors.password}
                        </div>
                      )
                    }
                  </div>

                  <div className="form-group">
                    <input
                      type="password"
                      name="confirmPassword"
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.confirmPassword
                      })}
                      placeholder="Confirm Password"
                    />
                    {
                      errors.confirmPassword && (
                        <div className="invalid-feedback">
                          {errors.confirmPassword}
                        </div>
                      )
                    }
                  </div>

                  <input
                    type="submit"
                    value="Submit"
                    className="btn btn-primary btn-block"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
        )
    }
}
Signup.propTypes = {
  signup: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  security: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  errors: state.errors,
  security: state.security,
})

export default connect(mapStateToProps,{signup})(Signup);