import axios from 'axios';

const logementsService = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

export const getLogements = (datalogements) => {
    return logementsService.get('logements', {
        params: {
            data: datalogements
        }
    });
};

export default logementsService;