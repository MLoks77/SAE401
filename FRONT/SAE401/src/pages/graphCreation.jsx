import Navbar from "../components/navbar";
import { useState, useRef, useEffect } from "react";

import GraphChart from "../components/creationexport/graphChart";
import BtnExport from "../components/creationexport/btnExport";

// par maxime derènes

const GraphCreation = () => {
    // liste des types de graphiques
    const graphType = [
        { type: "Histogramme", icon: "./images/graphicons/histogram.png" },
        { type: "Camembert", icon: "./images/graphicons/camembert.png" },
        { type: "Courbe", icon: "./images/graphicons/courbe.png" },
    ];

    const [activeGraphType, setActiveGraphType] = useState(graphType[0]); // utilise le premier graph : historigramme

    // titres
    const titres = ["Type de visualisation", "Données", "Filtres"];

    // liste tableaux metriques
    const metrics1 = [
        { type: "Nombre de logements", value: "nb_logements" },
        { type: "Loyer moyen au m²", value: "loyer_moyen" },
        { type: "Surface moyenne", value: "surface_moyenne" },
        { type: "Taux de vacance", value: "taux_vacance" },
    ];

    const axecomparaison = [
        { type: "Par département", value: "departement" },
        { type: "Par région", value: "region" },
        { type: "Par type de logement", value: "type_logement" },
    ];
    // filtres

    const filtres = [
        { type: "2021", value: "2021" },
        { type: "2022", value: "2022" },
        { type: "2023", value: "2023" },
    ];

    const [selectedYear1, setSelectedYear1] = useState("");
    const [selectedYear2, setSelectedYear2] = useState("");
    const year2Ref = useRef(null); // Réf pour cibler le second sélecteur d'année

    const handleYear1Change = (e) => {
        const value = e.target.value;
        setSelectedYear1(value);
        if (selectedYear2 && value > selectedYear2) {
            setSelectedYear2("");
        }
    };

    // Fonction pour remettre à zéro les deux années sélectionnées 
    const handleResetYears = () => {
        setSelectedYear1("");
        setSelectedYear2("");
    };

    // Effet pour donner le focus au second sélecteur dès que la première année est choisie = focus : élément en attente d'action
    useEffect(() => {
        if (selectedYear1 && !selectedYear2) {
            year2Ref.current?.focus();
        }
    }, [selectedYear1]);





    // filtre région

    const regions = [
        { type: "Auvergne-Rhône-Alpes", value: "auvergne-rhone-alpes" },
        { type: "Bourgogne-Franche-Comté", value: "bourgogne-franche-comte" },
        { type: "Bretagne", value: "bretagne" },
        { type: "Centre-Val de Loire", value: "centre-val-de-loire" },
        { type: "Corse", value: "corse" },
        { type: "Grand Est", value: "grand-est" },
        { type: "Hauts-de-France", value: "hauts-de-france" },
        { type: "Île-de-France", value: "ile-de-france" },
        { type: "Normandie", value: "normandie" },
        { type: "Nouvelle-Aquitaine", value: "nouvelle-aquitaine" },
        { type: "Occitanie", value: "occitanie" },
        { type: "Pays de la Loire", value: "pays-de-la-loire" },
        { type: "Provence-Alpes-Côte d'Azur", value: "provence-alpes-cote-d-azur" },
    ];

    const [selectedRegion, setSelectedRegion] = useState("");
    const chartRef = useRef(null);

    const handleRegionChange = (e) => {
        const value = e.target.value;
        setSelectedRegion(value);
    };

    return (
        <div className="h-screen flex flex-col overflow-hidden bg-[#111822]">
            <Navbar />
            <section className="flex-1 overflow-hidden">
                <div className="grid grid-cols-3 h-full gap-0">
                    <div className="bg-[#1A2432] h-full flex flex-col border-r border-[#334155] overflow-hidden">
                        <div className="flex-1 overflow-y-auto p-6 space-y-8">

                            {/* titre */}
                            <div className="space-y-2">
                                <h1 className="text-2xl text-white font-bold tracking-tight">Concevez et Exportez</h1>
                                <p className="text-[#D2D2D2] text-sm">
                                    Concevez <span className="underline underline-offset-4 decoration-blue-500">votre propre graphe</span> avec les données des parcs sociaux.
                                </p>
                            </div>

                            {/* choix du graphe */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-sm">1</span>
                                    <h2 className="text-white font-semibold uppercase text-xs tracking-wider">{titres[0]}</h2>
                                </div>
                                <div className="grid grid-cols-3 gap-3">
                                    {graphType.map((g) => {
                                        const isActive = activeGraphType.type === g.type;
                                        return (
                                            <button
                                                key={g.type}
                                                className={`flex flex-col items-center gap-2 p-3 rounded-xl cursor-pointer transition-all ${isActive
                                                    ? "bg-[#133479] border-2 border-blue-500"
                                                    : "bg-[#111822] border-2 border-transparent hover:bg-[#1e293b]"
                                                    }`}
                                                onClick={() => setActiveGraphType(g)}
                                            >
                                                <img src={g.icon} alt={g.type} className="w-8 h-8 object-contain" />
                                                <span className="text-[10px] text-white font-medium uppercase text-center">{g.type}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Étape 2 : Données */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-sm">2</span>
                                    <h2 className="text-white font-semibold uppercase text-xs tracking-wider">{titres[1]}</h2>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-[10px] text-[#94a3b8] font-bold uppercase">Métrique principale</label>
                                        <select className="w-full p-2.5 bg-[#111822] text-white rounded-lg border border-[#334155] outline-none cursor-pointer">
                                            <option value="" hidden>Choisir une métrique</option>
                                            {metrics1.map((m) => (
                                                <option key={m.type} value={m.value}>{m.type}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-[10px] text-[#94a3b8] font-bold uppercase">Axe de comparaison</label>
                                        <select className="w-full p-2.5 bg-[#111822] text-white rounded-lg border border-[#334155] outline-none cursor-pointer">
                                            <option value="" hidden>Choisir une dimension</option>
                                            {axecomparaison.map((c) => (
                                                <option key={c.type} value={c.value}>{c.type}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Étape 3 : Filtres */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-sm">3</span>
                                    <h2 className="text-white font-semibold uppercase text-xs tracking-wider">{titres[2]}</h2>
                                </div>

                                <div className="bg-[#111822]/40 p-4 rounded-xl border border-[#334155] space-y-4">
                                    <div className="flex flex-col gap-3">
                                        <div className="flex items-center justify-between">
                                            <label className="text-[10px] text-[#94a3b8] font-bold uppercase">Période</label>
                                            {(selectedYear1 || selectedYear2) && (
                                                <button onClick={handleResetYears} className="text-[10px] text-blue-400 hover:underline cursor-pointer">Réinitialiser</button>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <select
                                                className="flex-1 p-2 bg-[#111822] text-white text-xs rounded border border-[#334155] outline-none cursor-pointer"
                                                value={selectedYear1}
                                                onChange={handleYear1Change}
                                            >
                                                <option value="" hidden>De...</option>
                                                {filtres.map((f) => (
                                                    <option key={f.type} value={f.value}>{f.type}</option>
                                                ))}
                                            </select>
                                            <span className="text-blue-500">→</span>
                                            <select
                                                ref={year2Ref}
                                                className="flex-1 p-2 bg-[#111822] text-white text-xs rounded border border-[#334155] outline-none cursor-pointer disabled:opacity-30"
                                                value={selectedYear2}
                                                onChange={(e) => setSelectedYear2(e.target.value)}
                                                disabled={!selectedYear1}
                                            >
                                                <option value="" hidden>{selectedYear1 ? "À..." : "---"}</option>
                                                {filtres
                                                    .filter((f) => !selectedYear1 || parseInt(f.value) >= parseInt(selectedYear1))
                                                    .map((f) => (
                                                        <option key={f.type} value={f.value}>{f.type}</option>
                                                    ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-[10px] text-[#94a3b8] font-bold uppercase">Géographie</label>
                                        <select
                                            className="w-full p-2 bg-[#111822] text-white text-xs rounded border border-[#334155] outline-none cursor-pointer"
                                            value={selectedRegion}
                                            onChange={handleRegionChange}
                                        >
                                            <option value="">Toute la France</option>
                                            {regions.map((r) => (
                                                <option key={r.type} value={r.value}>{r.type}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Export fixe en bas du sidebar */}
                        <BtnExport chartRef={chartRef} />
                    </div>

                    <GraphChart ref={chartRef} activeGraphType={activeGraphType} />
                </div>
            </section>
        </div>
    );
};

export default GraphCreation;