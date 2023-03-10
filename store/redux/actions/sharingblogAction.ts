import blogService from '@/services/blogService';
import { CREATE_TITLE_BLOG,
        GET_ALL_BLOG_REQUEST,
        GET_ALL_BLOG_SUCCESS,
        GET_ALL_BLOG_FAILURE,
        CREATE_CONTENT_BLOG, 
        GET_BLOG_BY_SLUG,
        FILTER_ALL_BLOG_BY_AUTHOR,
        FILTER_ALL_BLOG_BY_TAGS,
        FILTER_ALL_BLOG_BY_TITLE} from '../constant/sharingblogConstant';

// hàm get ALL blogs
export const getAllBlogs = (token: string, limit?: number, author?: string, offset?: number) => {
    return (
        async (dispatch: any) => {
            await dispatch( {
                type: GET_ALL_BLOG_REQUEST
            })
            try {
                const blogs = await blogService.getAllPostsFollow(token, limit, author, offset);
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

export const getAllBlogsUser = (token: string, limit?: number, author?: string, offset?: number) => {
    return (
        async (dispatch: any) => {
            await dispatch( {
                type: GET_ALL_BLOG_REQUEST
            })
            try {
                const blogs = await blogService.getAllPosts(token, limit, author, offset);
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

export const getBlogBySlug = (blog: any) => {
    return {
        type: GET_BLOG_BY_SLUG,
        payload: blog
    }
}

export const getAllBlogsByAuthor = (blog: any) => {
    return {
        type: FILTER_ALL_BLOG_BY_AUTHOR,
        payload: blog
    }
}
export const getAllBlogsByTags = (blog: any) => {
    return {
        type: FILTER_ALL_BLOG_BY_TAGS,
        payload: blog
    }
}
export const getAllBlogsByTitle = (blog: any) => {
    return {
        type: FILTER_ALL_BLOG_BY_TITLE,
        payload: blog
    }
}