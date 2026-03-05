import axios from 'axios';

const regionsService = axios.create({
    baseURL: 'https://127.0.0.1:8000/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

export const getRegions = (id_region, nom_region) => {
    return regionsService.get('regions', {
        params: {
            id_region: id_region,
            nom_region: nom_region
        }
    });
};

export default regionsService;