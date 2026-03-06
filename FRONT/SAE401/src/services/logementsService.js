import axios from 'axios';

const logementsService = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

export const getLogements = (id_logement, annee, code_dept, nb_logements, taux_logements_sociaux, taux_logements_vacants) => {
    return logementsService.get('logements', {
        params: {
            id_logement: id_logement,
            annee: annee,
            code_dept: code_dept,
            nb_logements: nb_logements,
            taux_logements_sociaux: taux_logements_sociaux,
            taux_logements_vacants: taux_logements_vacants
        }
    });
};

export default logementsService;