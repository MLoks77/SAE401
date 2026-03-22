import Chart from "chart.js/auto";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useEffect, useRef, useState, useMemo } from "react";
import favicon from "/favicon/favicon.ico";
import { getLogements, getPopulation } from "../../services/ServicesPages/ComparaisonService";
import { Metriques } from "../../services/fonctionsglobales";

Chart.register(ChartDataLabels);

const Graphv1 = ({ selectedValue1, selectedMetrique }) => {

    const chartRef1 = useRef(null);
    const chartInstance1 = useRef(null);

    const lieu = selectedValue1;
    const metrique = selectedMetrique;

    const [chartData, setChartData] = useState([]);
    const [isLoading, setIsLoading] = useState(false); // État de chargement de l'api

    // Déterminer si c'est un pourcentage basé sur Metriques dans fonctionsglobales
    const isPourcent = useMemo(() => {
        const m = Metriques.find(item => item.value === metrique);
        return m?.isPourcent === "oui";
    }, [metrique]);

    const isReady = lieu !== "" && metrique !== "";

    useEffect(() => {
        const fetchMetriqueData = async () => {
            if (!lieu || !metrique) return;

            setIsLoading(true);
            try {
                const params = {}; // params = données API globale
                // Format attendu du lieu après correction dans btnCriteres : "dept-NN" ou "reg-N"
                if (lieu.startsWith("dept-")) {
                    params.code_dept = lieu.split("-")[1];
                } else if (lieu.startsWith("reg-")) {
                    params.id_region = lieu.split("-")[1];
                } else {
                    params.code_dept = lieu;
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

                // données liées aux métriques choisies
                // si logement, on récupère les logements
                // si population, on récupère les populations
                // includes vérifie si le paramètre est dans le tableau
                // await interrompt l'exécution d'une fonction asynchrone et attend la résolution d'une promesse
                if (logementMetriques.includes(metrique)) {
                    response = await getLogements(params);
                } else if (populationMetriques.includes(metrique)) {
                    response = await getPopulation(params);
                }

                if (response && response.data) {
                    let data = Array.isArray(response.data) ? response.data : [response.data]; // crée un array en utilisant les datas

                    if (isPourcent) {
                        data = data.map((item) => ({
                            ...item,
                            [metrique]: item[metrique] ? Number(item[metrique]).toFixed(2) : 0
                        }));
                    }
                    setChartData(data);
                } else {
                    setChartData([]);
                }

            } catch (error) {
                console.error("Erreur lors du chargement des données", error);
                setChartData([]); // On vide les données en cas d'erreurs
            } finally {
                setIsLoading(false); // On arrête le chargement
            }
        };

        fetchMetriqueData();

    }, [lieu, metrique, isPourcent]);

    const filteredChartData = useMemo(() => {
        const labels = [];
        const values = [];

        // On trie par année pour avoir un graphique cohérent
        const sortedData = [...chartData].sort((a, b) => Number(a.annee) - Number(b.annee));

        sortedData.forEach(record => {
            const val = record[metrique];
            if (val !== undefined && val !== null) {
                labels.push(record.annee);
                values.push(val);
            }
        });

        return { labels, values };
    }, [chartData, metrique]);

    useEffect(() => {
        if (chartRef1.current && filteredChartData.labels.length > 0) {
            const ctx = chartRef1.current.getContext("2d");

            // Détruire l'instance précédente si elle existe
            if (chartInstance1.current) {
                chartInstance1.current.destroy();
            }

            const metriqueLabel = Metriques.find(m => m.value === metrique)?.type || metrique;

            chartInstance1.current = new Chart(ctx, {
                type: "bar",
                data: {
                    labels: filteredChartData.labels,
                    datasets: [{
                        label: metriqueLabel,
                        data: filteredChartData.values,
                        backgroundColor: ["#8ecae6", "#219ebc", "#023047", "#ffb703", "#fb8500"],
                        borderColor: "white",
                        borderWidth: 1,
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    layout: {
                        padding: {
                            top: 15
                        }
                    },
                    plugins: {
                        legend: {
                            position: "top",
                            labels: { color: 'white' }
                        },
                        title: {
                            display: true,
                            text: `${metriqueLabel} - ${lieu.split('-')[1] || lieu}`,
                            color: 'white',
                            font: { size: 18, weight: 'bold' },
                        },
                        datalabels: {
                            color: 'white',
                            anchor: 'end',
                            align: 'top',
                            formatter: (value) => isPourcent ? `${value}%` : value,
                            font: { weight: 'bold' }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grace: '5%',
                            ticks: { color: 'white' },
                            grid: { color: 'rgba(255, 255, 255, 0.1)' }
                        },
                        x: {
                            ticks: { color: 'white' },
                            grid: { display: false }
                        }
                    }
                }
            });
        }

        return () => {
            if (chartInstance1.current) {
                chartInstance1.current.destroy();
            }
        };
    }, [filteredChartData, metrique, isPourcent, lieu]);

    return (
        <div className="bg-[#111822] p-4 h-full flex flex-col rounded-lg">
            {isReady ? (
                <div className="flex-1 relative w-full flex items-center justify-center min-h-[300px]">
                    {isLoading && (
                        <div className="absolute inset-0 z-10 bg-[#111822]/40 flex flex-col items-center justify-center backdrop-blur-[2px] gap-4">
                            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                            <p className="text-blue-400 font-medium animate-pulse text-sm">Récupération des données...</p>
                        </div>
                    )}

                    <canvas ref={chartRef1} className={isLoading ? "opacity-20 blur-[1px]" : "transition-opacity duration-500"}></canvas>

                    {!isLoading && filteredChartData.labels.length === 0 && (
                        <div className="absolute text-center p-6 border border-gray-700 rounded-lg bg-[#1A2432] shadow-xl">
                            <p className="text-gray-400 text-lg">Aucune donnée disponible pour cette sélection</p>
                        </div>
                    )}
                </div>
            ) : (
                <div className="m-auto text-center space-y-4">
                    <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto">
                        <img src={favicon} alt="Logo" className="w-8 h-8" />
                    </div>
                    <p className="text-[#94a3b8] font-medium italic">Veuillez remplir les étapes pour commencer la visualisation</p>
                </div>
            )}
        </div>
    );
};

export default Graphv1;
