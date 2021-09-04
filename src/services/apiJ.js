import axios from 'axios';

const apiJ = axios.create({
  baseURL: 'http://192.168.1.112:3000',
});

export default apiJ;