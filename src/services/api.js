import axios from 'axios';

const api = axios.create({
  baseURL: 'https://wishlistli.herokuapp.com',
});

export default api;