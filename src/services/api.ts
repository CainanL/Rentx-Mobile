import axios from 'axios';

const api = axios.create({
    baseURL: 'http://172.18.224.1:3333'
});

export { api };