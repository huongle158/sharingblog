import { combineReducers } from "redux";
import sharingBlogReducers from "./sharingblogReducer"
import userReducer from './userReducer';

const rootReducers = combineReducers({
    sharingBlogReducers,
    userReducer
});

export default rootReducers;