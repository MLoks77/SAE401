import axios from 'axios';

// "id": 819,
// "annee": 2023,
// "code_dept": "76",
// "nb_habitants": 1254334,
// "accroissement": 0,
// "pop_moins_20ans": 24,
// "pop_plus_60ans": 27,
// "taux_chomage": 7.5,
// "taux_pauvrete": 14.6


// les données présentes ici sont :
// nb_habitants
// accroissement
// pop_moins_20ans
// pop_plus_60ans
// taux_chomage
// taux_pauvrete

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