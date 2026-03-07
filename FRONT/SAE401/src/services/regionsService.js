import axios from 'axios';

const regionsService = axios.create({
    baseURL: 'https://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

export const getRegions = (params) => {
    return regionsService.get('regions', { params });
};

export default regionsService;