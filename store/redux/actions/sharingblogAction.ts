import blogService from '@/services/blogService';
import { CREATE_TITLE_BLOG,
        GET_ALL_BLOG_REQUEST,
        GET_ALL_BLOG_SUCCESS,
        GET_ALL_BLOG_FAILURE,
        CREATE_CONTENT_BLOG, 
        FILTER_ALL_BLOG_BY_AUTHOR,
        FILTER_ALL_BLOG_BY_TAGS,
        FILTER_ALL_BLOG_BY_TITLE,
        GET_BLOG_BY_SLUG_REQUEST,
        GET_BLOG_BY_SLUG_SUCCESS,
        GET_BLOG_BY_SLUG_FAILURE,
        GET_LENGTH_ALL_COMMENT_BLOG_DETAIL} from '../constant/sharingblogConstant';

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

export const getBlogBySlug = (token: string, slug: string) => {
    return (
        async (dispatch: any) => {
            await dispatch({
                type: GET_BLOG_BY_SLUG_REQUEST,
            })
            try {
                const blog = await blogService.getPostBySlug(token, slug)
                return dispatch({
                    type: GET_BLOG_BY_SLUG_SUCCESS,
                    payload: blog
                })
            }
            catch (err) {
                return dispatch({
                    type: GET_BLOG_BY_SLUG_FAILURE,
                    payload: err
                })
            }
        }
    )
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
