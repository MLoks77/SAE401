import axios from 'axios';

const regionsService = axios.create({
    baseURL: 'http://localhost:8000/api/regions',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

export default regionsService;