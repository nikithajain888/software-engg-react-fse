import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
// const BASE_URL = "http://softwareengineeringnodetest-env.eba-86qtfsgp.us-east-1.elasticbeanstalk.com";
const USERS_API = `${BASE_URL}/api/users`;

const api = axios.create({
   withCredentials: true
});

export const userTogglesTuitDislikes = async (uid, tid) =>
   api.put(`${USERS_API}/${uid}/dislikes/${tid}`)
      .then(response => response.data);

/**
 * 
 * @param {string} uid user id
 * @param {string} tid tuit id
 * @returns if a user has disliked the tuit, it returns a dislike object
 */
export const userHasDislikedTuit = async (uid, tid) => {
   const response = await api.get(`${USERS_API}/${uid}/userDisliked/${tid}`);
   return response.data;

}

export const userDislikedCount = (uid, tid) =>
   api.put(`${USERS_API}/${uid}/dislikes/${tid}`)
      .then(response => response.data);

export const findAllTuitsDislikedByUser = (userId) =>
   api.get(`${USERS_API}/${userId}/dislikes`)
      .then(response => response.data);