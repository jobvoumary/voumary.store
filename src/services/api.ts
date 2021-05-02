import axios from 'axios';

const api = axios.create({
  baseURL: 'https://voumary.vercel.app/api' ,
});

export default api;
