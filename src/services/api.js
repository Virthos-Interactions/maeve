import axios from 'axios';


const api = axios.create({
   // baseURL: 'https://agendador-virthos-mock-backend.mybluemix.net',
   baseURL: 'http://54.233.127.10:4000'
});

export default api;