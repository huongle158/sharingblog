import { CREATE_TITLE_BLOG,
        GET_ALL_BLOG_REQUEST,
        GET_ALL_BLOG_SUCCESS,
        GET_ALL_BLOG_FAILURE,
        CREATE_CONTENT_BLOG } from '../constant/sharingblogConstant';

const initialState: any = {
    newTitle : "",
    newContent: "",
    loading: false,
    posts: [],
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
        
    }

    return {...state}
}
export default sharingblogReducers
