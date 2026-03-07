import axios from 'axios';

const departementsService = axios.create({
    baseURL: 'https://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

export const getDepartements = (dataDepartements) => {
    return departementsService.get('departements', {
        params: {
            dataDepartements: dataDepartements
        }
    });
};

export default departementsService;