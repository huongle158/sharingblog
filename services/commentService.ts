const BASE_URL = 'http://localhost:3000/comments';
import { CREATED, INTERNAL_SERVER_ERROR, OK } from './../types/status';

const commentService = {
    createComment: async (token: string, slug: string, comment: string) => {
        try {
          const myHeaders = new Headers();
          myHeaders.append("Authorization", `Bearer ${token}`);
          myHeaders.append("Content-Type", "application/json");
      
          const raw = JSON.stringify({ content: comment });
      
          const requestOptions: any = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
          };
      
          const res = await fetch(`${BASE_URL}/create/${slug}`, requestOptions);
          if (res.status === CREATED) {
            return await res.json();
          }
        } catch (err) {
          console.error(err);
        }
        return null;
      },
      getComments: async (slug: string) => {
        try {
          const requestOptions: any = {
            method: 'GET',
            redirect: 'follow'
          };
      
          const res = await fetch(`${BASE_URL}/list/${slug}`, requestOptions);
          if (res.status === OK) {
            return await res.json();
          }
        } catch (err) {
          console.error(err);
        }
        return null;
      },
      updateComment: async (token: string, slug: string, commentId: number, newComment: string) => {
        try {
          const myHeaders = new Headers();
          myHeaders.append("Authorization", `Bearer ${token}`);
          myHeaders.append("Content-Type", "application/json");
      
          const raw = JSON.stringify({ content: newComment });
      
          const requestOptions: any = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
          };
      
          const res = await fetch(`${BASE_URL}/update/${slug}/${commentId}`, requestOptions);
          if (res.status === OK) {
            return await res.json();
          }
        } catch (err) {
          console.error(err);
        }
        return null;
      },
      deleteComment: async (token: string, slug: string, commentId: number) => {
        try {
          const myHeaders = new Headers();
          myHeaders.append("Authorization", `Bearer ${token}`);
      
          const requestOptions: any = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow',
          };
        
          const res = await fetch(`${BASE_URL}/delete/${slug}/${commentId}`, requestOptions);
          if (res.status === OK) {
            return await res.json();
          }
        } catch (err) {
          console.error(err);
        }
        return null;
      }
      
}
export default commentService