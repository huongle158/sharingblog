import { combineReducers } from "redux";
import sharingBlogReducers from "./sharingblogReducer"
import userReducer from './userReducer';
import tagReducer from './tagReducer';

const rootReducers = combineReducers({
    sharingBlogReducers,
    userReducer,
    tagReducer,
});

export default rootReducers;