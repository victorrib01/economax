import axios from 'axios';

const api = axios.create({
  baseURL: 'http://f5c2-45-226-126-124.ngrok-free.app',
});

export default api;
