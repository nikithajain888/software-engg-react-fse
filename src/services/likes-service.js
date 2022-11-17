import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const USERS_API = `${BASE_URL}/api/users`;
const TUITS_API = `${BASE_URL}/api/tuits`;

const api = axios.create({
    withCredentials: true
});

export const userTogglesTuitLikes = (uid, tid) =>
    api.put(`${USERS_API}/${uid}/likes/${tid}`)
        .then(response => response.data);
/**
 * 
 * @param {string} uid user id
 * @param {string} tid tuit id
 * @returns if a user has liked the tuit, it returns a like object
 */
export const userHasLikedTuit = async (uid, tid) => {
    const response = await api.get(`${USERS_API}/${uid}/userLiked/${tid}`);
    return response.data;
}

export const userLikedCount = async (uid, tid) =>
    api.put(`${USERS_API}/${uid}/likes/${tid}`)
        .then(response => response.data);

export const findAllTuitsLikedByUser = (userId) =>
    api.get(`${USERS_API}/${userId}/likes`)
        .then(response => response.data);