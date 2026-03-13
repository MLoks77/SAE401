import { getDepartements } from "../departementsService";
import { getRegions } from "../regionsService";
import { getLogements } from "../logementsService";
import { getPopulation } from "../populationService";

export const getAllAreas = async () => {
    // réponse de axios
    const requeteDepartement = await getDepartements();
    const requeteRegions = await getRegions();

    // trie
    const departementsTries = requeteDepartement.data.sort((a, b) => a.nom_dept.localeCompare(b.nom_dept));
    const regionsTriees = requeteRegions.data.sort((a, b) => a.nom_region.localeCompare(b.nom_region));

    return {
        departements: departementsTries,
        regions: regionsTriees
    };
};

