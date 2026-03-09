import { useState, useEffect } from "react";
import { getAllAreas } from "../../services/ServicesPages/ComparaisonService";


const BtnCriteres = () => {

    const [allAreas, setAllAreas] = useState([]);

    const [comparValue1, setValue1] = useState([]); // select de gauche
    const [comparValue2, setValue2] = useState([]); // select de droite

    // fetch pour utiliser les données de l'api dans ComparaisonService
    useEffect(() => {
        const fetchAreas = async () => {
            const areas = await getAllAreas();
            setAllAreas(areas);
        };
        fetchAreas();
    }, []);






    return (
        <section className="bg-[#1A2432] rounded-xl p-6 m-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 w-full">
                {/* value 1 */}
                <div className="flex flex-col gap-2 w-full flex-1">
                    <label className="text-slate-400 text-sm font-medium tracking-wide ml-1">Valeur n°1</label>
                    <select className="w-full bg-[#111822] text-slate-200 px-4 py-3 rounded-lg focus:ring-1 focus:ring-white transition-all cursor-pointer shadow-sm">
                        <option value="">Sélectionner une zone</option>
                    </select>
                </div>

                {/* swap button */}
                <div className="md:pt-7 flex justify-center items-center">
                    <button id="ValueSwapper" className="cursor-pointer p-3 bg-[#111822] hover:bg-slate-600 text-white rounded-full border border-gray-200 hover:border-gray-600 transition-all duration-300 flex items-center justify-center group shadow-sm" title="Inverser les choix">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500">
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <g id="Arrow / Arrows_Reload_01">
                                    <path id="Vector" d="M10 16H5V21M14 8H19V3M4.58301 9.0034C5.14369 7.61566 6.08244 6.41304 7.29255 5.53223C8.50266 4.65141 9.93686 4.12752 11.4298 4.02051C12.9227 3.9135 14.4147 4.2274 15.7381 4.92661C17.0615 5.62582 18.1612 6.68254 18.9141 7.97612M19.4176 14.9971C18.8569 16.3848 17.9181 17.5874 16.708 18.4682C15.4979 19.3491 14.0652 19.8723 12.5723 19.9793C11.0794 20.0863 9.58606 19.7725 8.2627 19.0732C6.93933 18.374 5.83882 17.3175 5.08594 16.0239" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                </g>
                            </g>
                        </svg>
                    </button>
                </div>

                {/* value 2 */}
                <div className="flex flex-col gap-2 w-full flex-1">
                    <label className="text-slate-400 text-sm font-medium tracking-wide ml-1">Valeur n°2</label>
                    <select className="w-full bg-[#111822] text-slate-200 px-4 py-3 rounded-lg focus:ring-1 focus:ring-white transition-all cursor-pointer shadow-sm">
                        <option value="">Sélectionner une zone</option>
                    </select>
                </div>
            </div>
        </section>
    );
};

export default BtnCriteres;