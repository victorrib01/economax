import axios from 'axios';
import Constants from 'expo-constants';

console.log('API Key:', Constants.manifest.extra.API_KEY);

const api = axios.create({
  baseURL: 'http://f5c2-45-226-126-124.ngrok-free.app',
});

export default api;
