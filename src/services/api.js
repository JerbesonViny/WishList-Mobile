import axios from 'axios';

const api = axios.create({
  baseURL: 'https://group-cycling-backend.herokuapp.com',
});

export default api;