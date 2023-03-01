const BASE_URL = 'http://localhost:3000/users';
import { CREATED, INTERNAL_SERVER_ERROR, OK } from './../types/status';

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
      if (res.status === OK) {
        return await res.json();
      }
      return null;
    } catch (err) {
      console.error(err);
      return null;
    }
  }
};

export default userService;
