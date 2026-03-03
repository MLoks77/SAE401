import axios from 'axios';

const logementsService = axios.create({
    baseURL: 'http://localhost:8000/api/logements',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

export default logementsService;