const BASE_URL = 'http://localhost:3000/profiles';
import { CREATED, INTERNAL_SERVER_ERROR, NOT_FOUND, OK } from './../types/status';

const followService = {
    getProfileByUsername: async (username: string) => {
        try {
          const response = await fetch(`${BASE_URL}/${username}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
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
      }
}
export default followService;