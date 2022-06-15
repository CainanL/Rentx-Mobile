import axios from 'axios';

const api = axios.create({
    baseURL: 'http://172.20.0.1:3333'
});

export { api };