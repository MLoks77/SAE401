import { getDepartements } from "../departementsService";
import { getRegions } from "../regionsService";


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