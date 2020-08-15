import axios from 'axios';

const api = axios.create({
   baseURL: process.env.REACT_APP_MOCK_URL
});

export const arnold = axios.create({
   baseURL: process.env.REACT_APP_ARNOLD_URL
});

export const bernard = axios.create({
   baseURL: process.env.REACT_APP_BERNARD_URL
});

export default api;
