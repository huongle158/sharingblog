import { CREATE_TITLE_BLOG,
        GET_ALL_BLOG_REQUEST,
        GET_ALL_BLOG_SUCCESS,
        GET_ALL_BLOG_FAILURE,
        CREATE_CONTENT_BLOG,
        FILTER_ALL_BLOG_BY_AUTHOR,
        FILTER_ALL_BLOG_BY_TAGS,
        FILTER_ALL_BLOG_BY_TITLE } from '../constant/sharingblogConstant';

const initialState: any = {
    newTitle : "",
    newContent: "",
    pending: false,
    blogs: [],
    error: ''
}

const sharingblogReducers = (state = initialState, action: any) => {
    switch (action.type) {
        case CREATE_TITLE_BLOG: 
            state.newTitle = action.payload;
            break;
        case CREATE_CONTENT_BLOG: 
            state.newContent = action.payload;
            break;
        case GET_ALL_BLOG_REQUEST: 
            state.pending = true;
            break;
        case GET_ALL_BLOG_SUCCESS: 
            state.pending = false;
            state.blogs = action.payload.articles;
            break;
        case FILTER_ALL_BLOG_BY_AUTHOR: 
            state.blogs = action.payload;
            break;
        case FILTER_ALL_BLOG_BY_TAGS: 
            state.blogs = action.payload;
            break;
        case FILTER_ALL_BLOG_BY_TITLE: 
            state.blogs = action.payload;
            break;
        default:
    }

    return {...state}
}
export default sharingblogReducers
