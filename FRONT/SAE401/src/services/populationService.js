import axios from 'axios';

const populationService = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

// datapopulation = fonction avec l'ensemble des données
export const getPopulation = (params = {}) => {
    return populationService.get('population', { params });
};

export default populationService;