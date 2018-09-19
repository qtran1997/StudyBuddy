import {
    GET_ERRORS,
    GET_MESSAGES,
    MESSAGES_LOADING,
    CLEAR_CURRENT_MESSAGES,
    GET_RECENT_MESSAGES,
    SEND_MESSAGES
} from "./types";
import axios from "axios";

// Get Messages
export const getMessages = otherUserId => dispatch => {
    dispatch(setMessagesLoading());
    axios
        .get("/api/messages/user/" + otherUserId)
        .then(res => {
            dispatch({
                type: GET_MESSAGES,
                payload: res.data
            });
        })
        .catch(err =>
            dispatch({
                type: GET_MESSAGES,
                payload: {}
            })
        );
};

// Get Recent Messages
export const getRecentMessages = () => dispatch => {
    axios
        .get("/api/messages/user/")
        .then(res => {
            dispatch({
                type: GET_RECENT_MESSAGES,
                payload: res.data
            });
        })
        .catch(err =>
            dispatch({
                type: GET_RECENT_MESSAGES,
                payload: {}
            })
        );
};

// Set Messages
export const sendMessages = (otherUserId, text) => dispatch => {
    axios
        .post("/api/messages/user/" + otherUserId, text)
        .then(res => {
            dispatch({
                type: SEND_MESSAGES,
                payload: res.data
            });
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Messages Loading
export const setMessagesLoading = () => {
    return {
        type: MESSAGES_LOADING
    };
};

// Clear Messages
export const clearCurrentMessages = () => {
    return {
        type: CLEAR_CURRENT_MESSAGES
    };
};

export const checkIfTopOfMessenger = () => {
    if (
        document.getElementsByClassName("messages-container")[0].scrollTop === 0
    ) {
        return true;
    }
    return false;
};
