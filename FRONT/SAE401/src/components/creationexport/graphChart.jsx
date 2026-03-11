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
    selectedZoneName,
    selectedY1,
    selectedY2,
    setDepartementvalues,
    setRegionvalues
}, ref) => {
    const chartRef = useRef(null); // ref pour le canvas
    const chartItem = useRef(null); // item pour l'export du graphique en img
    const [chartData, setChartData] = useState([]); // Données de l'api
    const [isLoading, setIsLoading] = useState(false); // État de chargement de l'api

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

    // On calcule les années et les données filtrées (on exclut les 0 ou les données manquantes)
    const filteredChartData = useMemo(() => {
        const début = Math.min(Number(selectedY1), Number(selectedY2));
        const fin = Math.max(Number(selectedY1), Number(selectedY2));
        const labels = [];
        const values = [];

        for (let year = début; year <= fin; year++) {
            const record = chartData.find(d => Number(d.annee) === year);
            const value = record ? record[selectedMetriques] : 0;

            // On n'ajoute que si la valeur n'est pas 0 (ou null/undefined)
            if (value && value !== 0) {
                labels.push(year);
                values.push(value);
            }
        }

        return { labels, values };
    }, [selectedY1, selectedY2, chartData, selectedMetriques]);

    // export du graphique
    useImperativeHandle(ref, () => ({
        toBase64Image: () => chartItem.current ? chartItem.current.toBase64Image() : null
    }));

    useEffect(() => {
        if (chartRef.current && activeGraphType && isReady && filteredChartData.labels.length > 0) { // on charge que si on a les données filtrées
            if (chartItem.current) {
                chartItem.current.destroy();
            }

            const ctx = chartRef.current.getContext("2d"); // on récupère le contexte du canvas, ici 2D
            chartItem.current = new Chart(ctx, {
                type: activeGraphType?.type === "Histogramme" ? "bar" : activeGraphType?.type === "Camembert" ? "pie" : "line",
                data: {
                    labels: filteredChartData.labels,
                    datasets: [{
                        label: metriqueLabel,
                        data: filteredChartData.values,
                        backgroundColor: (() => {
                            const palette = ["#8ecae6", "#219ebc", "#023047"];

                            if (activeGraphType?.type === "Camembert" || activeGraphType?.type === "Histogramme") {
                                return filteredChartData.labels.map((_, i) => palette[i % palette.length]);
                            }

                            return "rgba(73, 75, 79, 0.8)";
                        })(),
                        borderColor: "white",
                        borderWidth: 2,
                        pointRadius: 5,
                        fill: "white",
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        title: {
                            display: true,
                            text: `${selectedZoneName} / ${metriqueLabel}`,
                            color: 'white',
                            font: {
                                size: 18,
                                weight: 'bold'
                            },
                            padding: {
                                top: 10,
                                bottom: 30
                            }
                        },
                        legend: {
                            labels: {
                                color: 'white',
                                // Si c'est un histogramme, on cache la box de couleur
                                boxWidth: activeGraphType?.type === "Histogramme" ? 0 : 40,
                            }
                        },
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
                        },
                        // bibliothèque datalabels
                        datalabels: {
                            color: '#ecececff', // couleur des datalabels de la biblio datalabels
                            textShadowColor: 'black',
                            textShadowBlur: 5,
                            font: {
                                size: 16,
                                weight: 'bold'
                            },
                            align: 'bottom',
                            offset: 15,
                            formatter: (value) => {
                                return value + (isPourcent ? " %" : "");
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
    }, [activeGraphType, isReady, chartData, filteredChartData, selectedMetriques]);

    return (
        <div className="col-span-2 bg-[#111822] p-8 h-full flex flex-col">
            {isReady ? (
                <div className="flex-1 relative w-full flex items-center justify-center">
                    {isLoading && (
                        <div className="absolute inset-0 z-10 bg-[#111822]/40 flex flex-col items-center justify-center backdrop-blur-[2px] gap-4">
                            <div className="w-12 h-12 border-4 border-[#111822]/20 border-t-[#111822] rounded-full animate-spin"></div>
                            <p className="text-blue-400 font-medium animate-pulse text-sm">Récupération des données...</p>
                        </div>
                    )}

                    <canvas ref={chartRef} className={isLoading ? "opacity-20 blur-[1px]" : "transition-opacity duration-500"}></canvas>

                    {!isLoading && filteredChartData.labels.length === 0 && (
                        <div className="absolute text-center p-10 border border-white rounded-lg bg-[#111822]">
                            <p className="text-white text-lg">Aucune donnée disponible pour cette sélection</p>
                        </div>
                    )}
                </div>
            ) : (
                <div className="m-auto text-center space-y-4">
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