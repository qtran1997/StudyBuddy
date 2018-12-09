import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import profileReducer from "./profileReducer";
import messagesReducer from "./messagesReducer";
import successesReducer from "./successesReducer";

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    profile: profileReducer,
    messages: messagesReducer,
    successes: successesReducer
});
