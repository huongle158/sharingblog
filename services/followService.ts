const BASE_URL = 'http://localhost:3000/profiles';
import { CREATED, INTERNAL_SERVER_ERROR, NOT_FOUND, OK } from './../types/status';

const followService = {
  getProfileByUsername: async (token: string,username: any) => {
    try {
      const response = await fetch(`${BASE_URL}/${username}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (response.status === OK) {
        return await response.json();
      } else if (response.status === NOT_FOUND) {
        throw new Error('Profile not found');
      } else {
        throw new Error('Failed to fetch profile');
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  },
    getAllUserNotFollow: async ( token: string) => {
        try {
          const res = await fetch(`${BASE_URL}/notfollowing/list`, {
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
    followUser: async (token: string, username: string) => {
        try {
          const res = await fetch(`${BASE_URL}/follow/${username}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            redirect: 'follow'
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
    unfollowUser: async (token: string, username: string) => {
        try {
          const res = await fetch(`${BASE_URL}/unfollow/${username}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            redirect: 'follow'
          });
          if (res.status === OK) { // assuming that the response status code for success is 200 OK
            return await res.json();
          }
          return null;
        } catch (err) {
          console.error(err);
          return null;
        }
      }
    
}
export default followService;