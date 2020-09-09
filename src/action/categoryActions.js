import axios from "axios";
import {
  GET_ERRORS,
  GET_CATEGORIES,
  DELETE_CATEGORY,
  GET_CATEGORY,
  NUMBER_CATEGORIES,
} from "./Types";

export const createCategory = (category, history) => async (dispatch) => {
  try {
    await axios.post("http://localhost:8080/api/categories", category);
    history.push("/admin-dashboard-categories");

    dispatch({
      type: GET_ERRORS,
      payload: {},
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};

export const getCategories = () => async (dispatch) => {
  const res = await axios.get("http://localhost:8080/api/categories");
  dispatch({
    type: GET_CATEGORIES,
    payload: res.data,
  });
};

export const getCategory = (id, history) => async (dispatch) => {
  try {
    const res = await axios.get(`http://localhost:8080/api/categories/${id}`);
    dispatch({
      type: GET_CATEGORY,
      payload: res.data,
    });
  } catch (error) {
   // history.push("/adminDashboardCategory");
  }
};

export const deleteCategory = (id) => async (dispatch) => {
  if (window.confirm("Are You Sure You Want to Delete This Category?")) {
    await axios.delete(`http://localhost:8080/api/categories/${id}`);
    dispatch({
      type: DELETE_CATEGORY,
      payload: id,
    });
  }
};

export const uploadCategoryImage = (uploadedImage, catId) => async dispatch => {

  try {
    const res = await axios.post(`http://localhost:8080/api/categories/upload/image/${catId}`, uploadedImage);
    return res;
  } catch (error) {
    dispatch({
      type:GET_ERRORS,
      payload: error.response.data
    })
  }
}

export const getNumberOfCategories = () => async dispatch => {
  const res = await axios.get('http://localhost:8080/api/admin/number/categories');

  dispatch({
    type: NUMBER_CATEGORIES,
    payload: res.data
  })
}