import axios from "axios";
import { GET_SECTORS } from "./Types";


export const addSector = (sector, districtId) => async dispatch => {
    const res = await axios.post(`http://localhost:8080/api/location/sector/${districtId}`, sector);
    return res;
}

export const getSectors = () => async dispatch => {
    const res = await axios.get('http://localhost:8080/api/location/sector');
    dispatch({
        type: GET_SECTORS,
        payload: res.data,
    })
}