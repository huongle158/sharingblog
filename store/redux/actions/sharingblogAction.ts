import { CREATE_TITLE_BLOG } from './../../../types/actionConstan';

export const getTitleNewBlog = (title: any) => {
    return {
        type: CREATE_TITLE_BLOG,
        payload: title
    }
}

