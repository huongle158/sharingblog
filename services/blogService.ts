const BASE_URL = 'http://localhost:3000/articles';
import { CREATED, INTERNAL_SERVER_ERROR, OK } from './../types/status';

const blogService = {
    createPost: async (token: string, newBlog: object) => {
        try {
            const formData = new FormData();
            formData.append('title', newBlog.title);
            formData.append('content', newBlog.content);
            formData.append('banner', newBlog.banner);
            newBlog.tagList.forEach((tag: string) => {
                formData.append('tagList', tag);
            });

            const res = await fetch(`${BASE_URL}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData,
            });
            if (res.status === CREATED) {
                return await res.json();
            }
        } catch (err) {
            console.error(err);
        }
        return null;
    },

    getAllPosts: async (token: string, limit?: number, author?: string, tag?: string, offset?: number) => {
        let url = `${BASE_URL}?`;
        if (limit) {
            url += `limit=${limit}&`;
        }
        if (author) {
            url += `author=${author}&`;
        }
        if (offset) {
            url += `offset=${offset}&`;
        }
        if (tag) {
            url += `tag=${tag}&`;
        }
        try {
            const res = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (res.status === OK) {
                return await res.json();
            }
        } catch (err) {
            console.error(err);
        }
        return null;
    },

    getPostBySlug: async (token: string, slug: string) => {
        try {
            const res = await fetch(`${BASE_URL}/${slug}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (res.status === OK) {
                return await res.json();
            }
        } catch (err) {
            console.error(err);
        }
        return null;
    },

    updatePost: async (token: string, slug: string, updatedBlog: object) => {
        try {
            const formData = new FormData();
            formData.append('title', updatedBlog.title);
            formData.append('content', updatedBlog.content);
            updatedBlog.banner ? formData.append('banner', updatedBlog.banner) : null;
            updatedBlog.tagList.forEach((tag: string) => {
                formData.append('tagList', tag);
            });

            const res = await fetch(`${BASE_URL}/update/${slug}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData,
            });
            if (res.status === OK) {
                return await res.json();
            }
        } catch (err) {
            console.error(err);
        }
        return null;
    },

    deletePost: async (token: string, slug: string) => {
        try {
            const res = await fetch(`${BASE_URL}/${slug}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            if (res.status === OK) {
                return await res.json();
            }
        } catch (err) {
            console.error(err);
        }
        return null;
    }
};

export default blogService;



