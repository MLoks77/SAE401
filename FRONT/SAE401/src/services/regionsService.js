import axios from 'axios';

// "id_region": 84,
// "nom_region": "AUVERGNE-RHÔNE-ALPES"

const regionsService = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

export const getRegions = (params) => {
    return regionsService.get('regions', { params });
};

export default regionsService;