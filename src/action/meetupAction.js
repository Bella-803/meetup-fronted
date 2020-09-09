import axios from "axios";
import { GET_ERRORS, GET_MEETUPS,GET_MEETUP, DELETE_MEETUP, GET_GROUPS, NUMBER_MEETUPS } from "./Types";

export const createMeetup = (meetup, groupId, catId, history) => async (dispatch) => {
  try {
    await axios.post(`http://localhost:8080/api/meetups/${groupId}`, meetup);
    history.push(`/groupadminexploredetails/${catId}/${groupId}`);
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};

export const getMeetups = (groupId) => async (dispatch) => {
  const res = await axios.get(
    `http://localhost:8080/api/meetups/all/${groupId}`
  );
  dispatch({
    type: GET_MEETUPS,
    payload: res.data,
  });
};

export const getAllMeetups = () => async (dispatch) => {

  const res = await axios.get('http://localhost:8080/api/meetups/all');
  dispatch({
    type: GET_MEETUPS,
    payload: res.data
  })

}

export const getMeetup = (meetupId) => async (dispatch) => {
  const res = await axios.get(`http://localhost:8080/api/meetups/${meetupId}`);
  dispatch({
    type: GET_MEETUP,
    payload: res.data,
  });
};

export const deleteMeetup = (meetupId) => async (dispatch) => {
  if (window.confirm("Are you sure you want to delete this meetup?")) {
    await axios.delete(`http://localhost:8080/api/meetups/${meetupId}`);
    dispatch({
      type: DELETE_MEETUP,
      payload: meetupId,
    });
  }
};

export const updateMeetup = (meetup,groupId,catId,history) => async dispatch => {
  try {
    await axios.patch(`http://localhost:8080/api/meetups/${groupId}`,meetup);
    history.push(`/groupadminexploredetails/${catId}/${groupId}`)
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    })
  }
}

export const attendMeetup = (meetupId) => async dispatch => {
  try {
    await axios.post(`http://localhost:8080/api/meetups/attend/${meetupId}`);
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    })
  }
}

export const cancelMeetup = (meetupId) => async dispatch => {
  try {
    await axios.patch(`http://localhost:8080/api/meetups/cancel/${meetupId}`);
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    })
  }
}

export const uploadMeetupImage = (meetupId, uploadedImage) => async dispatch => {
  try {
    await axios.post(`http://localhost:8080/api/meetups/upload/image/${meetupId}`, uploadedImage);
  } catch (error) {
    dispatch({
      type:GET_ERRORS,
      payload: error.response.data,
    })
  }
}

export const getNumberOfMeetups = () => async dispatch => {
  const res = await axios.get('http://localhost:8080/api/admin/number/meetups');
  dispatch({
    type: NUMBER_MEETUPS,
    payload: res.data
  })
}