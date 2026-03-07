import axios from 'axios';

const regionsService = axios.create({
    baseURL: 'https://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

export const getRegions = (dataRegions) => {
    return regionsService.get('regions', {
        params: {
            dataRegions: dataRegions
        }
    });
};

export default regionsService;