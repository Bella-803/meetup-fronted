import axios from "axios";
import { GET_ERRORS, GET_DISTRICTS } from "./Types";

export const addDistrict = (district, provinceId) => async dispatch => {
    try {
        const res = await axios.post(`http://localhost:8080/api/location/district/${provinceId}`, district);
        return res;
    } catch (error) {
       dispatch({
           type: GET_ERRORS,
           payload: error.response.data
       }) 
    }
}

export const getDistricts = () => async dispatch => {
    const res = await axios.get('http://localhost:8080/api/location/district');
    dispatch({
        type: GET_DISTRICTS,
        payload: res.data
    })
}

export const getDistrictsByProvince = (provinceId) => async dispatch => {
    const res = await axios.get(`http://localhost:8080/api/location/district/province/${provinceId}`);
    dispatch({
        type: GET_DISTRICTS,
        payload: res.data
    })
}