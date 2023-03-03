const BASE_URL = 'http://localhost:3000/articles';
import { CREATED, INTERNAL_SERVER_ERROR, OK } from './../types/status';

const blogService = {
  createPost: async (token: string, newBlog: object) => {
    try {
      const formData = new FormData();
      formData.append('title', newBlog.title);
      formData.append('description', newBlog.description);
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

    getAllPosts: async () => {
      try {
        const res = await fetch(`${BASE_URL}`);
        if (res.status === OK) {
          return await res.json();
        }
      } catch (err) {
        console.error(err);
      }
      return null;
    },

    updatePost: async (id: string, updatedBlog: object) => {
      try {
        const res = await fetch(`${BASE_URL}/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedBlog),
        });
        if (res.status === OK) {
          return await res.json();
        }
      } catch (err) {
        console.error(err);
      }
      return null;
    },
  
    deletePost: async (id: string) => {
      try {
        const res = await fetch(`${BASE_URL}/${id}`, {
          method: 'DELETE',
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