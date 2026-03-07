import { getDepartements } from "../departementsService";
import { getRegions } from "../regionsService";
import { getLogements } from "../logementsService";
import { getPopulation } from "../populationService";

// id_logement: id_logement,
// annee: annee,
// code_dept: code_dept,
// nb_logements: nb_logements,
// taux_logements_sociaux: taux_logements_sociaux,
// taux_logements_vacants: taux_logements_vacants

// id: id,
// annee: annee,
// code_dept: code_dept,
// nb_habitants: nb_habitants,
// densite: densite,
// variation_pop: variation_pop,
// solde_naturel: solde_naturel,
// solde_migratoire: solde_migratoire,
// accroissementtotal: accroissementtotal,
// pop_moins_20ans: pop_moins_20ans,
// pop_plus_60ans: pop_plus_60ans,
// taux_chomage: taux_chomage,
// taux_pauvrete: taux_pauvrete



// Choix zone dans la partie 3 du graph

export const getDepartementsChoixZone = async (code_dept, nom_dept, id_region) => {
    // réponse de axios
    const requete = await getDepartements(code_dept, nom_dept, id_region); // await = attend

    // trie
    return requete.data.sort((a, b) => a.nom_dept.localeCompare(b.nom_dept)); // localeCompare = compare les chaînes de caractères, a -> b = ordre croissant
};

export const getRegionsChoixZone = async (id_region, nom_region) => {
    const requete = await getRegions(id_region, nom_region);

    return requete.data.sort((a, b) => a.nom_region.localeCompare(b.nom_region));
};

// choix des metriques

// --------- LOGEMENT ---------

// nbr logement
export const getNbrLogement = async (nb_logements) => {
    const requete = await getLogements(nb_logements);

    return requete.data;
};
// taux logement sociaux
export const getTauxLogementSociaux = async (taux_logements_sociaux) => {
    const requete = await getLogements(taux_logements_sociaux);

    return requete.data;
};
// taux logement vacants
export const getTauxLogementVacants = async (taux_logements_vacants) => {
    const requete = await getLogements(taux_logements_vacants);

    return requete.data;
};
// nbr habitants
export const getNbrHabitants = async (nb_habitants) => {
    const requete = await getLogements(nb_habitants);

    return requete.data;
};



// --------- POPULATION ---------

// accroissement population
export const getAccroissementPopulation = async (accroissement_population) => {
    const requete = await getPopulation(accroissement_population);

    return requete.data;
};

// population moins de 20 ans
export const getPopulationMoins20ans = async (pop_moins_20ans) => {
    const requete = await getPopulation(pop_moins_20ans);

    return requete.data;
};
// population plus de 60 ans
export const getPopulationPlus60ans = async (pop_plus_60ans) => {
    const requete = await getPopulation(pop_plus_60ans);

    return requete.data;
};
// taux chomage
export const getTauxChomage = async (taux_chomage) => {
    const requete = await getPopulation(taux_chomage);

    return requete.data;
};
// taux pauvrete
export const getTauxPauvrete = async (taux_pauvrete) => {
    const requete = await getPopulation(taux_pauvrete);

    return requete.data;
};