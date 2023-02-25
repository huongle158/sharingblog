const BASE_URL = 'http://localhost:8002/api/Customer';
import { CREATED, INTERNAL_SERVER_ERROR, OK } from './../types/status';

const blogService = {
  createPost: async (newBlog: object) => {
      try {
        const res = await fetch(`${BASE_URL}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newBlog),
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