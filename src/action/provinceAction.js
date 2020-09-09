import axios from "axios";
import { GET_ERRORS, GET_PROVINCES } from "./Types";

export const addProvince = (province) => async dispatch => {
    try {
        const res = await axios.post('http://localhost:8080/api/location/province', province);
        return res;
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        })
    }
}

export const getProvinces = () => async dispatch => {

    const res = await axios.get('http://localhost:8080/api/location/province');
    dispatch({
        type: GET_PROVINCES,
        payload: res.data
    })
}