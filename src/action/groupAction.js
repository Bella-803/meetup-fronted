import axios from "axios";
import { GET_ERRORS, GET_GROUPS, DELETE_GROUP, GET_GROUP, GET_MEMBERS, NUMBER_GROUPS } from "./Types";

export const createGroup = (meetupGroup, catId,sectorId, history) => async (
  dispatch
) => {
  try {
    const res = await axios.post(`http://localhost:8080/api/groups/${catId}/${sectorId}`, meetupGroup);
    const groupId = res.data.id
    history.push(`/groupadmindashboard/${groupId}/${catId}`);
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

export const getAllGroups = () => async dispatch => {
  const res = await axios.get('http://localhost:8080/api/groups/all');
  dispatch({
    type: GET_GROUPS,
    payload: res.data
  })
}

export const getGroup = (groupId) => async (dispatch) => {
  console.log("inside get group");
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
    history.push(`/groupadmindashboard/${catId}/${meetupGroup.id}`);
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

export const joinGroup = (groupId, history) => async dispatch => {

  try {
    await axios.post(`http://localhost:8080/api/groups/join/${groupId}`);
    //history.push(`/groupitemcontentuserview/${groupId}`);
  } catch (error) {
     dispatch({
      type : GET_ERRORS,
      payload: error.response.data,
     })
  }
}

export const uploadGroupImage = (groupId, uploadedImage) => async dispatch => {
  try {
    const res= await axios.post(`http://localhost:8080/api/groups/upload/image/${groupId}`, uploadedImage);
    return res.data;
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    })
  }
}

export const getNumberOfGroups = () => async dispatch => {
  const res = await axios.get('http://localhost:8080/api/admin/number/groups');
  dispatch({
    type: NUMBER_GROUPS,
    payload: res.data
  })
}