import axios from "axios";
import {GET_ERRORS, GET_MEMBERS, DELETE_USER, GET_GROUPS, GET_MEMBER, GET_CREATED_GROUP, NUMBER_USERS} from "./Types";

export const signup = (newUser, history) => async dispatch => {
    try {
        await axios.post('http://localhost:8080/users/register', newUser);
        history.push('/login');
        dispatch({
            type:GET_ERRORS,
            payload: {}
        })
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        })
    }
}

export const getAllUsers = () => async (dispatch) => {

    const res = await axios.get('http://localhost:8080/api/users/all');
    dispatch ({
        type: GET_MEMBERS,
        payload: res.data
      })
}

export const getUser = (userId) => async dispatch => {
    const res = await axios.get(`http://localhost:8080/api/users/${userId}`);
    dispatch ({
        type: GET_MEMBER,
        payload: res.data
      })
}

export const getUsersGroup = () => async dispatch => {
    const res = await axios.get('http://localhost:8080/api/users/groups');
    dispatch({
        type: GET_GROUPS,
        payload: res.data
    })
}

export const getAllCreatedGroup = () => async dispatch => {
    const res = await axios.get('http://localhost:8080/api/users/ownedGroup');
    dispatch({
        type: GET_CREATED_GROUP,
        payload: res.data
    })
}

export const deleteUser = (userId) => async dispatch => {

    if(window.confirm("Are you sure you want to permenantly delete the User ?")){
         
        await axios.delete(`http://localhost:8080/api/users/${userId}`);
        dispatch({
            type: DELETE_USER,
            payload: userId,
        })
    }
}

export const uploadUserProfile = (uploadedFile) => async dispatch => {
    try {
        await axios.post('http://localhost:8080/api/users/upload/profile', uploadedFile);
    } catch (error) {
        dispatch({
            type:GET_ERRORS,
            payload: error.response.data
        })
    }
}

export const getNumberOfUsers = () => async dispatch => {
    const res = await axios.get('http://localhost:8080/api/admin/number/users');
    dispatch({
        type: NUMBER_USERS,
        payload: res.data
    })
}