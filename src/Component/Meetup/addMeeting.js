import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createMeetup } from "../../action/meetupAction";
import classnames from "classnames";

class AddMeeting extends Component {
  constructor() {
    super();
    this.state = {
      meetingTitle: "",
      description: "",
      location: "",
      dateAndTime: "",
      errors: {},
      show: false,
      msg:"",
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
    const { groupId } = this.props.match.params;
    const { catId } = this.props.match.params;
    const myDateandTime = this.state.dateAndTime.replace("T", " ");
    const newMeetup = {
      meetingTitle: this.state.meetingTitle,
      description: this.state.description,
      location: this.state.location,
      dateAndTime: myDateandTime,
    };

    this.props.createMeetup(
      newMeetup,
      groupId,
      catId,
      this.props.history
    );
    this.setState({ msg : "Meetup successfully scheduled"})
    // this.handleClose();
  }

  handleClose() {
    this.setState({ show: false }); 
      document.location.reload(true);
  }

  handleShow() {
    this.setState({ show: true });
  }

  render() {
    const { errors } = this.state;
    let showMsg;

    if(this.state.msg === ""){
      showMsg = "";
    }else {
      showMsg = <div className="alert alert-success">{this.state.msg}</div>
    }
    return (
      <div>
        <React.Fragment>
          <Button variant="success" onClick={this.handleShow}>
            <i className="fas fa-plus-circle"> New Meeting</i>
          </Button>

          <Modal
            fade
            size="lg"
            show={this.state.show}
            onHide={this.handleClose}
          >

          {showMsg}
            <Modal.Header closeButton className="bg-success">
              <Modal.Title> Add new Meeting </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form>
                <div className="form-group">
                  <label for="meetingTitle">Meeting Title</label>
                  <input
                    id="meetingTitle"
                    type="text"
                    className={classnames("form-control", {
                      "is-invalid": errors.meetingTitle
                    })}
                    name="meetingTitle"
                    value={this.state.meetingTitle}
                    onChange={this.onChange}
                  />
                  {errors.meetingTitle && (
                    <div className="invalid-feedback">{errors.meetingTitle}</div>
                  )}
                </div>
                <div className="form-group">
                  <label for="meetingDescription">Meeting Description</label>
                  <textarea
                    id="meetingDescription"
                    name="description"
                    className={classnames("form-control", {
                      "is-invalid": errors.description
                    })}
                    value={this.state.description}
                    onChange={this.onChange}
                  ></textarea>
                  {errors.description && (
                    <div className="invalid-feedback">{errors.description}</div>
                  )}
                </div>
                <div className="form-group">
                  <label for="location">Location</label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    className={classnames("form-control", {
                      "is-invalid": errors.location
                    })}
                    value={this.state.location}
                    onChange={this.onChange}
                  />
                  {errors.location && (
                    <div className>{errors.location}</div>
                  )}
                </div>
                <div className="form-group">
                  <label for="dateAndTime">Date&Time</label>
                  <input
                    type="datetime-local"
                    id="dateAndTime"
                    name="dateAndTime"
                    className={classnames("form-control", {
                      "is-invalid": errors.location
                    })}
                    value={this.state.dateAndTime}
                    onChange={this.onChange}
                  />
                  {errors.dateAndTime && (
                    <div className="invalid-feedback">{errors.dateAndTime}</div>
                  )}
                </div>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <button className="btn btn-success" onClick={this.onSubmit}>
                Save
              </button>
              <button className="btn btn-danger" onClick={this.handleClose}>
                Close
              </button>
            </Modal.Footer>
          </Modal>
        </React.Fragment>
      </div>
    );
  }
}
AddMeeting.propTypes = {
  createMeetup: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  errors: state.errors,
});
export default connect(mapStateToProps, { createMeetup })(AddMeeting);
