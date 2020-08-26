import axios from "axios";
import { GET_ERRORS, GET_GROUPS, DELETE_GROUP, GET_GROUP, GET_MEMBERS } from "./Types";

export const createGroup = (meetupGroup, catId, history) => async (
  dispatch
) => {
  try {
    await axios.post(`http://localhost:8080/api/groups/${catId}`, meetupGroup);
    history.push(`/groupadmindashboard/${catId}`);
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};

export const getGroups = (catId) => async (dispatch) => {
  const res = await axios.get(`http://localhost:8080/api/groups/all/${catId}`);
  dispatch({
    type: GET_GROUPS,
    payload: res.data,
  });
};

export const getGroup = (groupId) => async (dispatch) => {
  const res = await axios.get(`http://localhost:8080/api/groups/${groupId}`);
  dispatch({
    type: GET_GROUP,
    payload: res.data,
  });
};

export const deleteGroup = (groupId) => async (dispatch) => {
  if (
    window.confirm("Are you sure you want to permanently delete this group?")
  ) {
    await axios.delete(`http://localhost:8080/api/groups/${groupId}`);
    dispatch({
      type: DELETE_GROUP,
      payload: groupId,
    });
  }
};

export const updateGroup = (meetupGroup, catId, history) => async (dispatch) => {
  try {
    await axios.patch(`http://localhost:8080/api/groups/${catId}`, meetupGroup);
    history.push(`/groupadmindashboard/${catId}`);
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    })
  }
}

export const getMembers = (groupId) => async dispatch => {
 
    const res = await axios.get(`http://localhost:8080/api/groups/members/${groupId}`);
    dispatch ({
      type: GET_MEMBERS,
      payload: res.data
    })
  
}

export const joinGroup = (groupId, userId, history) => async dispatch => {

  try {
    await axios.post(`http://localhost:8080/api/groups/join/${groupId}/${userId}`);
    history.push(`/groupitemcontentuserview/${groupId}`);
  } catch (error) {
     dispatch({
      type : GET_ERRORS,
      payload: error.response.data,
     })
  }
}