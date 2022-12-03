import axios from "axios";
// const BASE_URL = "http://softwareengineeringnodetest-env.eba-86qtfsgp.us-east-1.elasticbeanstalk.com";
const BASE_URL = process.env.REACT_APP_BASE_URL
const TUITS_API = `${BASE_URL}/api/tuits`;
const USERS_API = `${BASE_URL}/api/users`;
const api = axios.create({
  withCredentials: true
});

export const findAllTuits = () =>
  axios.get(TUITS_API)
    .then(response => response.data);

export const findTuitById = (tid) =>
  axios.get(`${TUITS_API}/${tid}`)
    .then(response => response.data);

export const findAllTuitsByUser = (uid) =>
  api.get(`${USERS_API}/${uid}/tuits`)
  .then(response => response.data);
  // axios.get(`${USERS_API}/${uid}/tuits`)
  //   .then(response => response.data);

export const createTuit = (uid, tuit) =>
  // axios.post(`${USERS_API}/${uid}/tuits`, tuit)
  //   .then(response => response.data);
  api.post(`${USERS_API}/${uid}/tuits`, tuit)
    .then(response => response.data);

export const updateTuit = (tid, tuit) =>
  axios.post(`${TUITS_API}/${tid}`, tuit)
    .then(response => response.data);

export const deleteTuit = (tid) =>
  axios.delete(`${TUITS_API}/${tid}`)
    .then(response => response.data);

export const deleteTuitsByTuit = (tuit) =>
  axios.get(`${TUITS_API}/${tuit}/delete`)
  .then(response => response.data);