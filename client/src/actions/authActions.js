import { GET_ERRORS, GET_SUCCESSES, SET_CURRENT_USER } from "./types";
import axios from "axios";
import jwt_decode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";

// Register User
export const registerUser = (userData, history) => dispatch => {
    axios
        .post("/api/users/register", userData)
        .then(res => {
            history.push("/login");
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Login - Get User Token
export const loginUser = userData => dispatch => {
    axios
        .post("/api/users/login", userData)
        .then(res => {
            // Save to localStorage
            const { token } = res.data;
            // Set token to ls
            localStorage.setItem("jwtToken", token);
            // Set token to Auth header
            setAuthToken(token);
            // Decode token to get user data
            const decoded = jwt_decode(token);
            // Set current user
            dispatch(setCurrentUser(decoded));
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Set logged in user
export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
};

// Log user out
export const logoutUser = () => dispatch => {
    // Rremove token from localStorage
    localStorage.removeItem("jwtToken");
    // Remove auth header for future requests
    setAuthToken(false);
    // Set current user to {} which will also set isAuthenticated to false
    dispatch(setCurrentUser({}));
};

// Profile - Set Up Profile
export const setupProfile = (userData, history) => dispatch => {
    axios
        .post("/api/profile", userData)
        .then(res => {
            history.push("/profile");
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Register User
export const changeSettingsUser = userData => dispatch => {
    axios
        .post("/api/users/change-settings", userData)
        .then(res => {
            console.log(res);
            dispatch({
                type: GET_SUCCESSES,
                payload: {
                    errors: res.data.errors,
                    successes: res.data.successes
                }
            });
        })
        .catch(err => {
            console.log(err.response);

            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};
