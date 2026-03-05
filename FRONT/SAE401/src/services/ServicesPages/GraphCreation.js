import { getDepartements } from "../departementsService";
import { getRegions } from "../regionsService";


// Choix zone dans la partie 3 du graph
export const getDepartementsChoixZone = (nom_dept = null) => {
    return getDepartements(nom_dept);
};

export const getRegionsChoixZone = (nom_region = null) => {
    return getRegions(nom_region);
};