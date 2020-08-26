import React, { Component } from 'react';
import {login} from "../../action/securityAction";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import classnames from "classnames";

class Login extends Component {
  constructor(){
    super();
    this.state = {
      username: "",
      password: "",
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

  componentWillReceiveProps(nextProps) {
    if(nextProps.security.validToken){
      this.props.history.push("/home");
    }

    if(nextProps.errors){
      this.setState({
        errors: nextProps.errors,
      })
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const loginRequest = {
      username: this.state.username,
      password: this.state.password,
    }

    this.props.login(loginRequest);
  }


  onChange(e) {
    this.setState({
      [e.target.name] : e.target.value
    })
  }
    render() {

      const {errors} = this.state;
        return (
     <section id="loginSection" className="mt-5 pt-5">
      <div className="container">
        <div className="row">
          <div className="col-md-6 mx-auto">
            <div className="card bg-light text-center card-form card-login">
              <div className="card-body py-5">
                <h3>Login</h3>
                <p>
                  Don't have an account?
                  <a href="/signup" className="text-primary"> Create account</a>
                </p>
                <form onSubmit={this.onSubmit}>
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
                           { errors.username } 
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
                          { errors.password}
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
Login.propTypes = {
  login: PropTypes.func.isRequired,
  security: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  security: state.security,
  errors: state.errors,
})
export default connect(mapStateToProps, {login})(Login);