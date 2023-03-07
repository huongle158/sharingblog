const BASE_URL = 'http://localhost:3000/users';
import { CREATED, INTERNAL_SERVER_ERROR, NOT_FOUND, OK } from './../types/status';

const userService = {
  login: async (input : any) => {
    try {
      const res = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      });
      if (res.status === CREATED) {
        return await res.json();
      }
      return null;
    } catch (err) {
      console.error(err);
      return null;
    }
  },
  
  register: async (input: any) => {
    try {
      const res = await fetch(`${BASE_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      });
      if (res.status === CREATED) {
        return await res.json();
      }
      return null;
    } catch (err) {
      console.error(err);
      return null;
    }
  },

  getInfo: async (token : string) => {
    try {
      const res = await fetch(`${BASE_URL}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.status === OK) {
        return await res.json();
      }
      return null;
    } catch (err) {
      console.error(err);
      return null;
    }
  },
  
  updateInfo: async (token: string, input: any) => {
    try {
      const res = await fetch(`${BASE_URL}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(input),
      });
      const data = await res.json();
      if (!res.ok) {
        // Throw an error if the response status is not ok
        throw new Error(data.message);
      }
      return data;
    } catch (err) {
      // Handle the error
      console.error(err);
      throw new Error('Có lỗi xảy ra khi cập nhật thông tin.');
    }
  },
  updateAvatar: async (token: string, formData: FormData) => {
    try {
      const res = await fetch(`${BASE_URL}/avatar`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData,
      });
  
      if (res.status === OK) {
        return await res.json();
      }
  
      return null;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
}
   



export default userService;
