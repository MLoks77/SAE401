import axios from 'axios';

// "id": 819,
// "annee": 2023,
// "code_dept": "76",
// "nb_logements": 653680,
// "taux_logements_sociaux": 26,
// "taux_logements_vacants": 8


//les données présentes ici sont:
// nb_logements
// taux_logements_sociaux
// taux_logements_vacants

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