import axios from 'axios';

const populationService = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

export const getPopulation = (id, annee, code_dept, nb_habitants, densite, variation_pop, solde_naturel, solde_migratoire, accroissementtotal, pop_moins_20ans, pop_plus_60ans, taux_chomage, taux_pauvrete) => {
    return populationService.get('population', {
        params: {
            id: id,
            annee: annee,
            code_dept: code_dept,
            nb_habitants: nb_habitants,
            densite: densite,
            variation_pop: variation_pop,
            solde_naturel: solde_naturel,
            solde_migratoire: solde_migratoire,
            accroissementtotal: accroissementtotal,
            pop_moins_20ans: pop_moins_20ans,
            pop_plus_60ans: pop_plus_60ans,
            taux_chomage: taux_chomage,
            taux_pauvrete: taux_pauvrete
        }
    });
};

export default populationService;