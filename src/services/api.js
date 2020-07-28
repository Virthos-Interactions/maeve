import axios from 'axios';


const api = axios.create({
   baseURL: 'https://agendador-virthos-mock-backend.mybluemix.net',
});

export default api;