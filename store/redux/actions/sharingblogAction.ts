import blogService from '@/services/blogService';
import { CREATE_TITLE_BLOG,
        GET_ALL_BLOG_REQUEST,
        GET_ALL_BLOG_SUCCESS,
        GET_ALL_BLOG_FAILURE,
        CREATE_CONTENT_BLOG } from '../constant/sharingblogConstant';

// hàm get ALL blogs
export const getAllBlogs = () => {
    return (
        async (dispatch: any) => {
            await dispatch( {
                type: GET_ALL_BLOG_REQUEST
            })
            try {
                const blogs = await blogService.getAllPosts();
                return dispatch({
                    type: GET_ALL_BLOG_SUCCESS,
                    payload: blogs
                })
            }
            catch (err) {
                return dispatch({
                    type: GET_ALL_BLOG_FAILURE,
                    payload: err
                })
            }
        }
    )
}

export const getTitleNewBlog = (title: any) => {
    return {
        type: CREATE_TITLE_BLOG,
        payload: title
    }
}
export const getContentNewBlog = (content: any) => {
    return {
        type: CREATE_CONTENT_BLOG,
        payload: content
    }
}

