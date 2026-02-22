import Navbar from "../components/navbar";
import BtnYear from "../components/btnYear";
import { useState } from "react";

// par maxime derènes

const GraphCreation = () => {
    // liste des types de graphiques
    const graphType = [
        { type: "Histogramme", icon: "./images/graphicons/histogram.png" },
        { type: "Camembert", icon: "./images/graphicons/camembert.png" },
        { type: "Courbe", icon: "./images/graphicons/courbe.png" },
    ];

    const taillegraph = "50px"

    const [activeGraphType, setActiveGraphType] = useState(graphType);
    // fin liste des types de graphiques

    // titres
    const titres = ["Type de visualisation", "Données", "Filtres"];
    // fin titres

    // liste tableaux metriques
    const metrics1 = [
        { type: "Sélectionnez une métrique", value: null },
        { type: "Nombre de logements", value: "nb_logements" },
        { type: "Loyer moyen au m²", value: "loyer_moyen" },
        { type: "Surface moyenne", value: "surface_moyenne" },
        { type: "Taux de vacance", value: "taux_vacance" },
    ];

    const [activeMetrics1, setActiveMetrics1] = useState(metrics1);

    const axecomparaison = [
        { type: "Sélectionnez une comparaison", value: null },
        { type: "Par département", value: "departement" },
        { type: "Par région", value: "region" },
        { type: "Par type de logement", value: "type_logement" },
    ];

    // Pour le moment j'ai mis 2 valeurs null juste pour "remettre à 0"

    const [activeAxecomparaison, setActiveAxecomparaison] = useState(axecomparaison);
    // fin tableaux metriques

    return (
        <div>
            <Navbar></Navbar>
            <BtnYear></BtnYear>

            <section>

                <div className="grid grid-cols-3 grid-rows-1 gap-0">
                    <div className="bg-[#1A2432]">
                        <div className="grid grid-cols-1 grid-rows-5 gap-4 mt-2">


                            <div className="row-start-1 mt-5 mx-5">
                                <h1 className="text-[24px] text-white font-bold">Concevez et Exportez </h1>
                                <p className="text-[#D2D2D2] text-lg">Concevez <span className="underline underline-offset-2">votre propre graphe</span> en utilisant les données des parcs sociaux français.</p>
                            </div>


                            <div className="row-start-2 mx-5">
                                <div className="flex items-center gap-2">
                                    <p className="border border-white bg-blue-600 rounded-full px-2 text-white">1</p>
                                    <h1 className="text-[#D2D2D2] text-lg font-bold px-2">{titres[0]}</h1>
                                </div>
                                {/* Grille pour choisir les graphs */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
                                    {graphType.map((g) => {
                                        const isActive = activeGraphType.type === g.type; // vérifie si le graphique est actif
                                        return (
                                            <button key={g.type}
                                                className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer text-white transition-colors ${isActive ? "bg-[#133479] border border-blue-400" : "bg-[#111822] hover:bg-[#1A2A40]"}`}
                                                onClick={() => setActiveGraphType(g)}
                                            >
                                                <img src={g.icon} alt={g.type} className="mb-3 object-contain" style={{ width: taillegraph, height: taillegraph }} />
                                                <h2 className="font-semibold text-sm md:text-base">{g.type}</h2>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>


                            <div className="row-start-3 mx-5">
                                <div className="flex items-center gap-2">
                                    <p className="border border-white bg-blue-600 rounded-full px-2 text-white">2</p>
                                    <h1 className="text-[#D2D2D2] text-lg font-bold px-2">{titres[1]}</h1>
                                </div>


                                <div className="mt-5 flex flex-col gap-5">
                                    <select
                                        id="metriques"
                                        className="w-full p-3 bg-[#111822] text-white cursor-pointer"
                                    >
                                        <option value="" hidden>Sélectionnez une métrique</option>
                                        {metrics1.map((m) => (
                                            <option key={m.type} value={m.value}>{m.type}</option>
                                        ))}
                                    </select>

                                    <select
                                        id="comparaison"
                                        className="w-full p-3 bg-[#111822] text-white cursor-pointer"
                                    >
                                        <option value="" hidden>Sélectionnez une comparaison</option>
                                        {axecomparaison.map((c) => (
                                            <option key={c.type} value={c.value}>{c.type}</option>
                                        ))}
                                    </select>
                                </div>

                            </div>


                            <div className="row-start-4 mx-5">
                                <div className="flex items-center gap-2">
                                    <p className="border border-white bg-blue-600 rounded-full px-2 text-white">3</p>
                                    <h1 className="text-[#D2D2D2] text-lg font-bold px-2">{titres[2]}</h1>
                                </div>
                            </div>


                            <div className="row-start-5 bg-[#152033]">
                                <button className="flex items-center justify-center w-[600px] border border-blue-400 bg-[#133479] rounded-lg h-12 text-white">
                                    <p>Exporter</p>
                                </button>
                            </div>


                        </div>
                    </div>





                    {/* Canva Graphique */}
                    <div className="col-span-2 bg-[#111822]">
                        <canvas id="graph"></canvas>
                    </div>
                </div>

            </section>
        </div>
    );
};

export default GraphCreation;