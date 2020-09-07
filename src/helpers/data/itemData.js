import axios from 'axios';
import apiKeys from '../apiKeys.json';
import utils from '../utils';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getItemsByUid = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/items.json?orderBy="uid"&equalTo="${uid}"`)
    .then(({ data }) => resolve(utils.responseToArray(data)))
    .catch((err) => reject(err));
});

const getSingleItem = (itemId) => axios.get(`${baseUrl}/items/${itemId}.json`);

const createItem = (itemObj) => axios.post(`${baseUrl}/items.json`, itemObj);

const deleteItem = (itemId) => axios.delete(`${baseUrl}/items/${itemId}.json`);

const updateItem = (itemId, itemObj) => axios.put(`${baseUrl}/items/${itemId}.json`, itemObj);

export default {
  getItemsByUid,
  getSingleItem,
  createItem,
  deleteItem,
  updateItem,
};
