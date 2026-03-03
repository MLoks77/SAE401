import axios from 'axios';

const departementsService = axios.create({
    baseURL: 'http://localhost:8000/api/departements',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

export default departementsService;