import Chart from "chart.js/auto";
import ChartDataLabels from 'chartjs-plugin-datalabels';

import { useRef, useEffect, forwardRef, useImperativeHandle, useState, useMemo } from "react";
import favicon from "/favicon/favicon.ico";

// API
import {
    getDepartementsChoixZone,
    getRegionsChoixZone,
    getPopulation,
    getLogements
} from "../../services/ServicesPages/GraphCreation";

// affiche les datas sur les charts en global
// https://chartjs-plugin-datalabels.netlify.app/guide/getting-started.html#integration
Chart.register(ChartDataLabels);

const GraphChart = forwardRef(({
    activeGraphType,
    isReady,
    selectedMetriques,
    metriqueLabel,
    isPourcent,
    selectedAxe,
    selectedRegion,
    selectedY1,
    selectedY2,
    setDepartementvalues,
    setRegionvalues
}, ref) => {
    const chartRef = useRef(null); // ref pour le canvas
    const chartItem = useRef(null); // item pour l'export du graphique en img
    const [chartData, setChartData] = useState([]); // Données de l'api
    const [isLoading, setIsLoading] = useState(false); // État de chargement de l'api

    // Fetch initial pour les listes de zones
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [deptsRes, regionsRes] = await Promise.all([
                    getDepartementsChoixZone(), // choix departement
                    getRegionsChoixZone() // choix region
                ]);
                setDepartementvalues(deptsRes); // stockage des departements
                setRegionvalues(regionsRes); // stockage des regions
            } catch (error) {
                console.error("Erreur lors du fetch des zones", error);
            }
        };
        fetchData();
    }, [setDepartementvalues, setRegionvalues]);


    // useeffect qui récupère les données de l'api : avec différents params
    useEffect(() => {
        const fetchMetriqueData = async () => {
            if (!isReady || !selectedMetriques || !selectedRegion) return;

            setIsLoading(true); // On lance le chargement
            try {
                const typeAxe = selectedAxe;
                const valeurZone = selectedRegion;

                const params = {};
                if (typeAxe === "departement") {
                    params.code_dept = valeurZone;
                } else if (typeAxe === "region") {
                    params.id_region = valeurZone;
                }

                const logementMetriques = [
                    "nb_logements",
                    "taux_logements_sociaux",
                    "taux_logements_vacants"
                ];

                const populationMetriques = [
                    "nb_habitants",
                    "accroissement",
                    "pop_moins_20ans",
                    "pop_plus_60ans",
                    "taux_chomage",
                    "taux_pauvrete"
                ];

                let response;

                if (logementMetriques.includes(selectedMetriques)) {
                    response = await getLogements(params);
                } else if (populationMetriques.includes(selectedMetriques)) {
                    response = await getPopulation(params);
                }

                if (response && response.data) {
                    setChartData(response.data);
                } else if (response) {
                    setChartData(response);
                }

            } catch (error) {
                console.error("Erreur lors du chargement des données", error);
                setChartData([]);
            } finally {
                setIsLoading(false); // On arrête le chargement
            }
        };

        fetchMetriqueData();

    }, [selectedMetriques, selectedAxe, selectedRegion, selectedY1, selectedY2, isReady]);

    // calcul du choix de l'année
    const annees = useMemo(() => {
        const début = Math.min(Number(selectedY1), Number(selectedY2));
        const fin = Math.max(Number(selectedY1), Number(selectedY2));
        const results = [];
        for (let year = début; year <= fin; year++) {
            results.push(year);
        }
        return results;
    }, [selectedY1, selectedY2]);

    // données affichées suivant l'annee
    const dataAffichee = useMemo(() => {
        return annees.map(annee => {
            const record = chartData.find(d => Number(d.annee) === annee);
            return record ? record[selectedMetriques] : 0;
        });
    }, [annees, chartData, selectedMetriques]);

    // export du graphique
    useImperativeHandle(ref, () => ({
        toBase64Image: () => chartItem.current ? chartItem.current.toBase64Image() : null
    }));

    useEffect(() => {
        if (chartRef.current && activeGraphType && isReady && chartData.length > 0) { // on charge que si on a les données
            if (chartItem.current) {
                chartItem.current.destroy();
            }

            const ctx = chartRef.current.getContext("2d"); // on récupère le contexte du canvas, ici 2D
            chartItem.current = new Chart(ctx, {
                type: activeGraphType?.type === "Histogramme" ? "bar" : activeGraphType?.type === "Camembert" ? "pie" : "line",
                data: {
                    labels: annees,
                    datasets: [{
                        label: metriqueLabel,
                        data: dataAffichee,
                        backgroundColor: (() => {
                            const palette = ["#370ACA", "#F3E200", "#C51F1F"];

                            if (activeGraphType?.type === "Camembert" || activeGraphType?.type === "Histogramme") {
                                return annees.map((_, i) => palette[i % palette.length]);
                            }

                            return "rgba(59, 130, 246, 0.5)";
                        })(),
                        borderColor: "white",
                        borderWidth: 2,
                        pointRadius: 20,
                        fill: false
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { labels: { color: "white" } },
                        tooltip: {
                            callbacks: {
                                label: (valeur) => {
                                    // On récupère le nom de la série (ex: "Nombre de logements")
                                    let label = valeur.dataset.label || '';
                                    // Si le nom existe, on rajoute deux points
                                    if (label) label += ' : ';

                                    // https://www.youtube.com/watch?v=gKCL5if1ixE : vidéo pour les pourcentages

                                    if (valeur.parsed.y !== null && valeur.parsed.y !== undefined) {
                                        // On ajoute la valeur et le symbole % si nécessaire
                                        label += valeur.parsed.y + (isPourcent ? " %" : "");
                                    }
                                    // Sinon si c'est une valeur brute (Camembert)
                                    else if (valeur.parsed !== null) {
                                        // On ajoute la valeur et le symbole % si nécessaire
                                        label += valeur.parsed + (isPourcent ? " %" : "");
                                    }
                                    return label;
                                }
                            }
                        }
                    },
                    scales: activeGraphType?.type !== "Camembert" ? {
                        y: {
                            beginAtZero: true,
                            grid: { color: "rgba(255, 255, 255, 0.1)" },
                            ticks: {
                                color: "white",
                                callback: function (value) {
                                    return value + (isPourcent ? " %" : "");
                                }
                            }
                        },
                        x: {
                            ticks: { color: "white" }
                        }
                    } : {}
                }
            });
        }
    }, [activeGraphType, isReady, chartData, dataAffichee, annees, selectedMetriques]);

    return (
        <div className="col-span-2 bg-[#111822] p-8 h-full flex flex-col items-center justify-center">
            {isReady ? (
                <div className="flex-1 relative min-h-0 w-full flex items-center justify-center">
                    {isLoading && (
                        <div className="absolute inset-0 z-10 bg-[#111822]/40 flex items-center justify-center backdrop-blur-[2px]">
                            <div className="flex flex-col items-center gap-4">
                                <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
                                <p className="text-blue-400 font-medium animate-pulse text-sm">Récupération des données...</p>
                            </div>
                        </div>
                    )}
                    <canvas ref={chartRef} className={isLoading ? "opacity-20 blur-[1px]" : "opacity-100 transition-opacity duration-500"}></canvas>

                    {!isLoading && chartData.length === 0 && (
                        <div className="text-center absolute">
                            <p className="text-[#94a3b8] italic">Aucune donnée disponible pour cette sélection</p>
                        </div>
                    )}
                </div>
            ) : (
                <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto">
                        <img src={favicon} alt="Logo" className="w-8 h-8" />
                    </div>
                    <p className="text-[#94a3b8] font-medium italic">Veuillez remplir les 3 étapes pour commencer la visualisation</p>
                </div>
            )}
        </div>
    );
});

export default GraphChart;