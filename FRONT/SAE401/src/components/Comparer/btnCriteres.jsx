// imports
import { useState, useEffect } from "react";
import { getAllAreas } from "../../services/ServicesPages/ComparaisonService";
import { capitalfirstletter } from "../../services/fonctionsglobales";
// services
import { Metriques } from "../../services/fonctionsglobales";
import { getEtapeClassName } from "../../services/fonctionsglobales";

// par maxime derènes

const BtnCriteres = () => {

    // State pour stocker les deux listes
    const [areas, setAreas] = useState({ departements: [], regions: [] });

    // fetch pour utiliser les données de l'api dans ComparaisonService
    useEffect(() => {
        const fetchAreas = async () => {
            const data = await getAllAreas();
            setAreas(data);
        };
        fetchAreas();
    }, []);

    const Metriquesbtn = Metriques;

    // partie 1
    const [selectedMetrique, setSelectedMetrique] = useState("");
    // Value 1
    const [selectedValue1, setSelectedValue1] = useState("");
    // Value 2
    const [selectedValue2, setSelectedValue2] = useState("");

    //  GESTION DES ÉTAPES 
    const isEtape1Complete = selectedMetrique !== ""; // selection metrique
    const areValues1Selected = selectedValue1 !== ""; // selection des valeurs 1, pour l'affichage des graphiques
    const areValues2Selected = selectedValue2 !== ""; // selection des valeurs 2, pour l'affichage des graphiques

    const loadCanva1 = () => {
        if (areValues1Selected) {
            return <Graphv1 />;
        }
    };
    const loadCanva2 = () => {
        if (areValues2Selected) {
            return <Graphv2 />;
        }
    };

    return (
        <section className="bg-[#1A2432] rounded-xl p-6 m-4">

            <div className="flex flex-col mb-2">
                {/* titre */}
                <h1 className="text-2xl font-bold text-white mb-3">Comparer : <span className="text-sm ml-1 text-gray-400">Choisissez puis comparez les données de 2 zones de votre choix</span></h1>
            </div>

            {/* partie 1 */}
            <span id="partie1">
                {/* metriques */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 w-full mb-5">
                    <div className="flex flex-col gap-2 w-full flex-1">
                        <label className="text-slate-400 text-md font-medium tracking-wide ml-1">Métriques</label>
                        <select value={selectedMetrique} onChange={(e) => setSelectedMetrique(e.target.value)} className="w-full bg-[#111822] text-slate-200 px-4 py-3 rounded-lg focus:ring-1 focus:ring-white transition-all cursor-pointer shadow-sm">
                            <option value="">Sélectionner une métrique</option>
                            {Metriquesbtn.map((metrique) => (
                                <option key={metrique.value} value={metrique.value}>
                                    {metrique.type}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </span>

            {/* partie 2 et 3*/}
            <div id="partie2" className="flex flex-col md:flex-row items-center justify-between gap-6 w-full">
                {/* V1 PARTIE 2*/}
                <section className={getEtapeClassName(isEtape1Complete) + "flex flex-col gap-2 w-full flex-1"}>
                    <label className="text-slate-400 text-md font-medium tracking-wide ml-1">Valeur n°1</label>
                    <select value={selectedValue1} onChange={(e) => setSelectedValue1(e.target.value)} className="w-full bg-[#111822] text-slate-200 px-4 py-4 my-2 rounded-lg focus:ring-1 focus:ring-white transition-all cursor-pointer shadow-sm">
                        <option value="">Sélectionner une zone</option>

                        <optgroup label="Départements">
                            {areas.departements.map((dept) => (
                                <option key={dept.code_dept} value={dept.nom_dept}>
                                    {dept.code_dept} - {dept.nom_dept}
                                </option>
                            ))}
                        </optgroup>

                        <optgroup label="Régions">
                            {areas.regions.map((reg) => (
                                <option key={reg.id_region} value={reg.nom_region}>
                                    {capitalfirstletter(reg.nom_region)}
                                </option>
                            ))}
                        </optgroup>
                    </select>
                </section>


                {/* V2 PARTIE 3*/}
                <section className={getEtapeClassName(isEtape1Complete) + "flex flex-col gap-2 w-full flex-1"}>
                    <label className="text-slate-400 text-md font-medium tracking-wide ml-1">Valeur n°2</label>
                    <select value={selectedValue2} onChange={(e) => setSelectedValue2(e.target.value)} className="w-full bg-[#111822] text-slate-200 px-4 py-4 my-2 rounded-lg focus:ring-1 focus:ring-white transition-all cursor-pointer shadow-sm">
                        <option value="">Sélectionner une zone</option>

                        <optgroup label="Départements">
                            {areas.departements.map((dept) => (
                                <option key={dept.code_dept} value={dept.nom_dept}>
                                    {dept.code_dept} - {dept.nom_dept}
                                </option>
                            ))}
                        </optgroup>

                        <optgroup label="Régions">
                            {areas.regions.map((reg) => (
                                <option key={reg.id_region} value={reg.nom_region}>
                                    {capitalfirstletter(reg.nom_region)}
                                </option>
                            ))}
                        </optgroup>
                    </select>
                </section>
            </div>
        </section>
    );
};

export default BtnCriteres;