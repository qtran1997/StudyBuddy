import {
    GET_MESSAGES,
    MESSAGES_LOADING,
    CLEAR_CURRENT_MESSAGES,
    GET_RECENT_MESSAGES,
    SEND_MESSAGES
} from "../actions/types";

const initialState = {
    recentMessages: null,
    messages: null,
    loading: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case SEND_MESSAGES:
            return {
                ...state,
                recentMessages: null,
                messages: action.payload,
                loading: false
            };
        case GET_RECENT_MESSAGES:
            return {
                ...state,
                recentMessages: action.payload,
                messages: null,
                loading: false
            };
        case MESSAGES_LOADING:
            return {
                ...state,
                loading: true
            };
        case GET_MESSAGES:
            return {
                ...state,
                recentMessages: null,
                messages: action.payload,
                loading: false
            };
        case CLEAR_CURRENT_MESSAGES:
            return {
                ...state,
                recentMessages: null,
                messages: null
            };
        default:
            return state;
    }
}
