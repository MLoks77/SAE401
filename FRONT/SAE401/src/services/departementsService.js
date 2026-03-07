import axios from 'axios';

const departementsService = axios.create({
    baseURL: 'https://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

export const getDepartements = (params) => {
    return departementsService.get('departements', { params });
};

export default departementsService;