import { getDepartements } from "../departementsService";
import { getRegions } from "../regionsService";
export { getLogements } from "../logementsService";
export { getPopulation } from "../populationService";

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
