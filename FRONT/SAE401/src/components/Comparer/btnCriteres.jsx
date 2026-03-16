// imports
import { useState, useEffect } from "react";
import { getAllAreas } from "../../services/ServicesPages/ComparaisonService";
import { capitalfirstletter } from "../../services/fonctionsglobales";
// services
import { Metriques } from "../../services/fonctionsglobales";
import { getEtapeClassName } from "../../services/fonctionsglobales";

// par maxime derènes

// pour envoyer les fonctions du parent à l'enfant mais pouvoir les utiliser dans l'enfant on en fait des props

const BtnCriteres = ({
    selectedMetrique,
    setSelectedMetrique,
    selectedValue1,
    setSelectedValue1,
    selectedValue2,
    setSelectedValue2
}) => {

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

    //  GESTION DES ÉTAPES 
    const isEtape1Complete = selectedMetrique !== ""; // selection metrique

    const handleReset = () => {
        setSelectedValue1("");
        setSelectedValue2("");
        setSelectedMetrique("");
    };

    return (
        <section className="bg-[#1A2432] rounded-xl p-6 m-4">

            <div className="flex flex-col mb-2">
                {/* titre */}
                <div className="flex flex-row items-center justify-between gap-6 w-full mb-5">
                    <h1 className="text-2xl font-bold text-white mb-3">Comparer : <span className="text-sm ml-1 text-gray-400">Choisissez puis comparez les données de 2 zones de votre choix</span></h1>
                    {/* bouton reset */}
                    <button onClick={handleReset} title="Réinitialiser" className={`${isEtape1Complete ? "opacity-100 pointer-events-auto" : "opacity-30 pointer-events-none grayscale"} bg-red-600 cursor-pointer hover:bg-red-700 text-white p-2 rounded-xl transition-all border border-red-500/20 group`}>
                        <svg
                            className="w-5 h-5 transition-transform duration-500 group-hover:rotate-360"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{ transform: 'scaleX(-1)' }}
                        >
                            <path
                                d="M6 7L7 6L4.70711 3.70711L5.19868 3.21553C5.97697 2.43724 7.03256 2 8.13323 2C11.361 2 14 4.68015 14 7.93274C14 11.2589 11.3013 14 8 14C6.46292 14 4.92913 13.4144 3.75736 12.2426L2.34315 13.6569C3.90505 15.2188 5.95417 16 8 16C12.4307 16 16 12.3385 16 7.93274C16 3.60052 12.4903 0 8.13323 0C6.50213 0 4.93783 0.647954 3.78447 1.80132L3.29289 2.29289L1 0L0 1V7H6Z"
                                fill="currentColor"
                            />
                        </svg>
                    </button>
                </div>
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
                                <option key={dept.code_dept} value={`dept-${dept.code_dept}`}>
                                    {dept.code_dept} - {dept.nom_dept}
                                </option>
                            ))}
                        </optgroup>

                        <optgroup label="Régions">
                            {areas.regions.map((reg) => (
                                <option key={reg.id_region} value={`reg-${reg.id_region}`}>
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
                                <option key={dept.code_dept} value={`dept-${dept.code_dept}`}>
                                    {dept.code_dept} - {dept.nom_dept}
                                </option>
                            ))}
                        </optgroup>

                        <optgroup label="Régions">
                            {areas.regions.map((reg) => (
                                <option key={reg.id_region} value={`reg-${reg.id_region}`}>
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