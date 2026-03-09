import { useState, useMemo, useRef } from "react";
import { capitalfirstletter } from "../services/fonctions";

// composants
import Navbar from "../components/navbar";
import GraphChart from "../components/creationexport/graphChart";
import BtnReset from "../components/creationexport/btnReset";
import BtnExport from "../components/creationexport/btnExport";



// par maxime derènes

const GraphCreation = () => {
    // global
    const titres = ["Type de visualisation", "Données", "Filtres"];
    const chartRef = useRef(null); // graphique



    //  PARTIE 1
    const [activeGraphType, setActiveGraphType] = useState(null); // choix du graphique
    const graphType = [
        { type: "Histogramme", icon: "./images/graphicons/histogram_b.png" },
        { type: "Camembert", icon: "./images/graphicons/camembert_b.png" },
        { type: "Courbe", icon: "./images/graphicons/courbe_b.png" },
    ];

    //  PARTIE 2 
    const [departementvalues, setDepartementvalues] = useState([]); // départements
    const [regionvalues, setRegionvalues] = useState([]); // régions
    const [selectedMetriques, setSelectedMetriques] = useState(""); // métriques
    const [selectedAxe, setSelectedAxe] = useState(""); // axe de comparaison : par région ou par département 

    // choix metrique
    const Metriquess1 = [
        { type: "Nombre de logements", value: "nb_logements", isPourcent: "non" },
        { type: "Taux de logements sociaux", value: "taux_logements_sociaux", isPourcent: "oui" },
        { type: "Taux de logements vacants", value: "taux_logements_vacants", isPourcent: "oui" },
        { type: "Nombre d'habitants", value: "nb_habitants", isPourcent: "non" },
        { type: "Accroissement population", value: "accroissement", isPourcent: "oui" },
        { type: "Population moins de 20 ans", value: "pop_moins_20ans", isPourcent: "oui" },
        { type: "Population plus de 60 ans", value: "pop_plus_60ans", isPourcent: "oui" },
        { type: "Taux de chomage", value: "taux_chomage", isPourcent: "oui" },
        { type: "Taux de pauvreté", value: "taux_pauvrete", isPourcent: "oui" },
    ];

    const axecomparaison = [
        { type: "Par département", value: "departement" },
        { type: "Par région", value: "region" },
    ];

    //  PARTIE 3
    const Y2Ref = useRef(null); // valeur 2e année de comparaison

    const [selectedRegion, setSelectedRegion] = useState(""); // région sélectionnée
    const [selectedY1, setSelectedY1] = useState(""); // valeur 1e année de comparaison
    const [selectedY2, setSelectedY2] = useState(""); // valeur 2e année de comparaison

    const filtres = [
        { type: "2021", value: "2021" },
        { type: "2022", value: "2022" },
        { type: "2023", value: "2023" },
    ];

    // gère le changement de région / depart choisi
    const handleRegionChange = (e) => setSelectedRegion(e.target.value);



    // calcul de la valeur 2e année de comparaison
    // si V1 = 2022, V2 ne peut pas être à 2021
    const handleY1Change = (e) => {
        const value = e.target.value;
        setSelectedY1(value);
        if (selectedY2 && value > selectedY2) {
            setSelectedY2("");
        }
    };

    // met les valeurs Y1 Y2 a null vide
    const handleResetYs = () => {
        setSelectedY1("");
        setSelectedY2("");
    };

    // reset des setters
    const reset = () => {
        setActiveGraphType(null);
        setSelectedMetriques("");
        setSelectedAxe("");
        setSelectedY1("");
        setSelectedY2("");
        setSelectedRegion("");
    };

    const regionsAfficher = selectedAxe === "departement" ? departementvalues : (selectedAxe === "region" ? regionvalues : []);

    //  GESTION DES ÉTAPES 
    const isEtape1Complete = activeGraphType !== null; // étape 1 = choix du graphique
    const isEtape2Complete = isEtape1Complete && selectedMetriques !== "" && selectedAxe !== ""; // étape 2 = axe comparaison
    const isEtape3Complete = isEtape2Complete && selectedY1 !== "" && selectedY2 !== "" && selectedRegion !== ""; // étape 3 = choix des filtres
    const isEtape4Complete = isEtape3Complete; // étape 4 = export

    const getEtapeClassName = (isUnlocked) => {
        const baseClasses = "p-4 rounded-lg transition-all duration-500";
        if (!isUnlocked) {
            return `${baseClasses} bg-[#111822]/80 opacity-30 pointer-events-none grayscale`;
        }
        return `${baseClasses} bg-[#111822]`;
    };

    // Recupération du titre du graphique
    const selectedZoneName = useMemo(() => {
        if (!selectedRegion || !selectedAxe) return "";
        const zone = regionsAfficher.find(r => {
            const key = selectedAxe === "departement" ? r.code_dept : r.id_region;
            return String(key) === String(selectedRegion);
        });
        if (!zone) return "";
        return selectedAxe === "departement"
            ? `${zone.code_dept} - ${capitalfirstletter(zone.nom_dept)}`
            : capitalfirstletter(zone.nom_region);
    }, [selectedRegion, selectedAxe, regionsAfficher]);

    return (
        <div className="h-screen flex flex-col overflow-hidden bg-[#111822]">
            <Navbar />
            <section className="flex-1 overflow-hidden">
                <div className="grid grid-cols-3 h-full gap-0">
                    {/* SIDEBAR DE CONFIG */}
                    <div className="bg-[#1A2432] h-full flex flex-col border-r border-[#334155] overflow-hidden">
                        <div className="flex-1 overflow-y-auto p-6 space-y-8">
                            {/* En-tête */}
                            <div className="space-y-2">
                                <h1 className="text-2xl text-white font-bold tracking-tight">Concevez et Exportez</h1>
                                <p className="text-[#D2D2D2] text-sm">
                                    Concevez <span className="underline underline-offset-4 decoration-blue-500">votre propre graphe</span> avec les données des parcs sociaux.
                                </p>
                            </div>

                            {/* étape 1 : TYPE DE GRAPHE */}
                            <section className={getEtapeClassName(true)}>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-sm">1</span>
                                        <h2 className="text-white font-semibold uppercase text-xs tracking-wider">{titres[0]}</h2>
                                    </div>
                                    <div className="grid grid-cols-3 gap-3">
                                        {graphType.map((g) => (
                                            <button
                                                key={g.type}
                                                className={`flex flex-col items-center gap-2 p-3 rounded-xl cursor-pointer transition-all border ${activeGraphType?.type === g.type
                                                    ? "bg-[#133479] border-blue-500 border-2"
                                                    : "bg-[#111822] border-white/10 border-2 hover:bg-[#1e293b]"
                                                    }`}
                                                onClick={() => setActiveGraphType(g)}
                                            >
                                                <img src={g.icon} alt={g.type} className="w-8 h-8 object-contain" />
                                                <span className="text-[10px] text-white font-medium uppercase text-center">{g.type}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </section>

                            {/* étape 2 : DONNÉES */}
                            <section className={getEtapeClassName(isEtape1Complete)}>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-sm">2</span>
                                        <h2 className="text-white font-semibold uppercase text-xs tracking-wider">{titres[1]}</h2>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-[10px] text-[#94a3b8] font-bold uppercase">Métrique principale</label>
                                            <select
                                                value={selectedMetriques}
                                                onChange={(e) => setSelectedMetriques(e.target.value)}
                                                className="w-full p-2.5 bg-[#111822] text-white rounded-lg border border-[#334155] outline-none cursor-pointer"
                                            >
                                                <option value="" hidden>Choisir une métrique</option>
                                                {Metriquess1.map((m) => (
                                                    <option key={m.type} value={m.value}>{m.type}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-[10px] text-[#94a3b8] font-bold uppercase">Axe de comparaison</label>
                                            <select
                                                value={selectedAxe}
                                                onChange={(e) => setSelectedAxe(e.target.value)}
                                                className="w-full p-2.5 bg-[#111822] text-white rounded-lg border border-[#334155] outline-none cursor-pointer"
                                            >
                                                <option value="" hidden>Choisir une dimension</option>
                                                {axecomparaison.map((c) => (
                                                    <option key={c.type} value={c.value}>{c.type}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* étape 3 : FILTRES */}
                            <section className={getEtapeClassName(isEtape2Complete)}>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-sm">3</span>
                                        <h2 className="text-white font-semibold uppercase text-xs tracking-wider">{titres[2]}</h2>
                                    </div>

                                    <div className="bg-[#111822]/40 p-4 rounded-xl border border-[#334155] space-y-4">
                                        <div className="flex flex-col gap-3">
                                            <div className="flex items-center justify-between">
                                                <label className="text-[10px] text-[#94a3b8] font-bold uppercase">Période</label>
                                                {(selectedY1 || selectedY2) && (
                                                    <button onClick={handleResetYs} className="text-[10px] text-blue-400 hover:underline cursor-pointer">Réinitialiser</button>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <select
                                                    className="flex-1 p-2 bg-[#111822] text-white text-xs rounded border border-[#334155] outline-none cursor-pointer"
                                                    value={selectedY1} // première selection de l'année
                                                    onChange={handleY1Change} // s'occupe du changement
                                                >
                                                    <option value="" hidden>De...</option>
                                                    {filtres.map((f) => (
                                                        <option key={f.type} value={f.value}>{f.type}</option>
                                                    ))}
                                                </select>
                                                <span className="text-blue-500">→</span>
                                                <select
                                                    ref={Y2Ref} // year sur la 2e selection de l'année
                                                    className="flex-1 p-2 bg-[#111822] text-white text-xs rounded border border-[#334155] outline-none cursor-pointer disabled:opacity-30"
                                                    value={selectedY2} // valeur 2 séléctionné
                                                    onChange={(e) => setSelectedY2(e.target.value)}
                                                    disabled={!selectedY1} // désactive le select si pas de valeur 1
                                                >
                                                    <option value="" hidden>{selectedY1 ? "À..." : "---"}</option>
                                                    {filtres
                                                        .filter((f) => !selectedY1 || parseInt(f.value) >= parseInt(selectedY1))
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
                                                <option value="" hidden>Choisir une zone...</option>
                                                {regionsAfficher.map((r) => {

                                                    // si departement = code_dept, si region = id_region
                                                    const isDept = selectedAxe === "departement";
                                                    // pas besoin de répéter pour région vu que on utilise ?
                                                    // clé = code_dept ou id_region
                                                    const key = isDept ? r.code_dept : r.id_region;
                                                    // nom = nom_dept ou nom_region
                                                    const name = isDept ? r.code_dept + " - " + capitalfirstletter(r.nom_dept) : capitalfirstletter(r.nom_region);

                                                    // si existe pas = affiche pas
                                                    if (!name) return null;

                                                    return (
                                                        <option key={`${selectedAxe}-${key}`} value={key}>
                                                            {name}
                                                        </option>
                                                    );
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* ACTIONS EN BAS */}
                            <div className="flex justify-center gap-2 pt-4 border-t border-[#334155]">
                                <div className={isEtape4Complete ? "opacity-100 pointer-events-auto" : "opacity-30 pointer-events-none grayscale"}>
                                    <BtnExport chartRef={chartRef} />
                                </div>
                                <div className={isEtape1Complete ? "opacity-100 pointer-events-auto" : "opacity-30 pointer-events-none grayscale"}>
                                    <BtnReset reset={reset} />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* ZONE DE VISUALISATION */}
                    <GraphChart
                        ref={chartRef}
                        activeGraphType={activeGraphType}
                        isReady={isEtape3Complete}
                        selectedMetriques={selectedMetriques}
                        metriqueLabel={Metriquess1.find(m => m.value === selectedMetriques)?.type || "Valeur"}
                        isPourcent={Metriquess1.find(m => m.value === selectedMetriques)?.isPourcent === "oui"}
                        selectedAxe={selectedAxe}
                        selectedRegion={selectedRegion}
                        selectedZoneName={selectedZoneName}
                        selectedY1={selectedY1}
                        selectedY2={selectedY2}
                        setDepartementvalues={setDepartementvalues}
                        setRegionvalues={setRegionvalues}


                    /> {/* le graphique va récupérer toute les données pour pouvoir afficher ce que l'on souhaite */}
                </div>
            </section>
        </div>
    );
};

export default GraphCreation;