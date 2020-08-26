import axios from "axios";
import {GET_ERRORS, SET_CURRENT_USER} from "./Types";
import setJWTToken from "../securityUtils/setJWTToken";
import jwt_decode from "jwt-decode";

export const signup = (newUser,history) => async dispatch => {
    try {
        axios.post('http://localhost:8080/users/register',newUser);
        history.push('/login');
        dispatch({
            type : GET_ERRORS,
            payload: {},
        });
    } catch (error) {
        dispatch({
            type : GET_ERRORS,
            payload: error.response.data,
        })
    }
}

export const login = (loginRequest) => async dispatch => {
    try {
        const res = await axios.post('http://localhost:8080/users/login', loginRequest);

        //extract token from res.data
        const {token} = res.data;

        //store the token in the localStorage
        localStorage.setItem("jwtToken",token);

        //set our token in header
        setJWTToken(token);

        //decode the token on react
        const decoded = jwt_decode(token);

        console.log(decoded);
        //dispatch to security reducer
        dispatch({
            type: SET_CURRENT_USER,
            payload: decoded
        })

    } catch (error) {
       dispatch({
        type: GET_ERRORS,
        payload: error.response.data
       })
    }
}

export const logout = () => async dispatch => {
   localStorage.removeItem("jwtToken");
   setJWTToken(false);
   dispatch({
       type: SET_CURRENT_USER,
       payload: {},
   })
}