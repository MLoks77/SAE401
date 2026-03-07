import axios from 'axios';

const logementsService = axios.create({
    baseURL: 'https://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

export const getLogements = (params = {}) => {
    return logementsService.get('logements', { params });
};

export default logementsService;