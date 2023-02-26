import { CREATE_TITLE_BLOG,
        GET_ALL_BLOG_REQUEST,
        GET_ALL_BLOG_SUCCESS,
        GET_ALL_BLOG_FAILURE } from '../../../types/actionConstant';

const initialState: any = {
    newTitle : "",
    loading: false,
    posts: [],
    error: ''
}

const sharingblogReducers = (state = initialState, action: any) => {
    // switch (action.type) {
    //     case action.type : 
    //     state.newTitle = action.payload
    // }
    console.log(action)
    return {...state}
}
export default sharingblogReducers
