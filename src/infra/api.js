import axios from 'axios';

const api = axios.create({
  baseURL: 'http://63b4-45-226-126-124.ngrok.io/',
});

export default api;
