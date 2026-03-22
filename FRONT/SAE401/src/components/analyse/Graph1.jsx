import { Chart as ChartJS, registerables } from 'chart.js';
import { useState, useEffect, useRef } from 'react';
import { getLogements } from '../../services/logementsService';
import { getPopulation } from '../../services/populationService';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(...registerables, ChartDataLabels);

const Graph1 = ({ analysisType }) => {
    const [logements, setLogements] = useState([]);
    const [population, setPopulation] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false); // État de chargement de l'api

    // Références vers nos éléments Canvas
    const barChartRef = useRef(null);
    const regionsMapping = {
        'Hauts-de-France': ['02', '59', '60', '62', '80'],
        'Auvergne Rhône-Alpes': ['01', '03', '07', '15', '26', '38', '42', '43', '63', '69', '73', '74'],
        'Réunion': ['974']
    };

    // Références vers les instances de Chart pour pouvoir les détruire à la mise à jour
    const barChartInstance = useRef(null);

    useEffect(() => {
        setIsLoading(true);
        Promise.all([getLogements(), getPopulation()])
            .then(([logementsRes, populationRes]) => {
                const logementsData = Array.isArray(logementsRes.data) ? logementsRes.data :
                    (logementsRes.data['hydra:member'] ? logementsRes.data['hydra:member'] : Object.values(logementsRes.data));

                const populationData = Array.isArray(populationRes.data) ? populationRes.data :
                    (populationRes.data['hydra:member'] ? populationRes.data['hydra:member'] : Object.values(populationRes.data));

                setLogements(logementsData);
                setPopulation(populationData);
            })
            .catch(err => {
                console.error("Erreur API : ", err);
                setError(err.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    // Effet pour dessiner et mettre à jour les graphiques quand les données ou l'état changent
    useEffect(() => {
        if (logements.length === 0 || population.length === 0) return; // Ne rien dessiner si pas de données

        const getGlobalMetricForYear = (year) => {
            const yearData = logements.filter(l => l.annee == year);
            if (yearData.length === 0) return [0, 0, 0];

            const totalLogements = yearData.reduce((acc, curr) => acc + (Number(curr.nb_logements) || 0), 0);
            const avgSociaux = yearData.reduce((acc, curr) => acc + (Number(curr.taux_logements_sociaux) || 0), 0) / yearData.length;
            const avgVacants = yearData.reduce((acc, curr) => acc + (Number(curr.taux_logements_vacants) || 0), 0) / yearData.length;

            // Échelle harmonisée : logements / 100 000 pour être dans le même ordre de grandeur que les taux (10-40)
            return [
                Math.round((totalLogements / 100000) * 10) / 10,
                Math.round(avgSociaux * 10) / 10,
                Math.round(avgVacants * 10) / 10
            ];
        };

        const getRegionalMetric = (regionName) => {
            const codes = regionsMapping[regionName];
            // Filtrer les données pour ces départements (ex: pour l'année 2023)
            const regionData = logements.filter(l => codes.includes(l.code_dept) && l.annee === 2023);

            if (regionData.length === 0) return [0, 0, 0];

            // Calculer le total pour 'nb_logements'
            const total = regionData.reduce((acc, curr) => acc + (Number(curr.nb_logements) || 0), 0);
            // Calculer la moyenne pour les taux
            const avgSociaux = regionData.reduce((acc, curr) => acc + (Number(curr.taux_logements_sociaux) || 0), 0) / regionData.length;
            const avgVacants = regionData.reduce((acc, curr) => acc + (Number(curr.taux_logements_vacants) || 0), 0) / regionData.length;

            return [
                Math.round(total / 100000 * 10) / 10,
                Math.round(avgSociaux * 10) / 10,
                Math.round(avgVacants * 10) / 10
            ];
        };

        if (barChartInstance.current) {
            barChartInstance.current.destroy();
        }

        if (analysisType === 'Analyse globale') {
            const barCtx = barChartRef.current.getContext('2d');
            barChartInstance.current = new ChartJS(barCtx, {
                type: 'bar',
                data: {
                    labels: ['Nombre de logements (x100 000)', 'Taux logements sociaux (%)', 'Taux logements vacants (%)'],
                    datasets: [
                        {
                            label: '2021',
                            data: getGlobalMetricForYear(2021),
                            backgroundColor: "#8ecae6"
                        },
                        {
                            label: '2022',
                            data: getGlobalMetricForYear(2022),
                            backgroundColor: "#219ebc"
                        },
                        {
                            label: '2023',
                            data: getGlobalMetricForYear(2023),
                            backgroundColor: "#023047"
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { position: 'top', labels: { color: 'white' } },
                        title: {
                            display: true,
                            text: 'Indicateurs de logements',
                            color: 'white',
                            font: { size: 16 }
                        },
                        datalabels: {
                            color: 'white',
                            anchor: 'end',
                            align: 'top',
                            offset: 4,
                            font: { weight: 'bold', size: 11 },
                            formatter: (value) => value
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            suggestedMax: 50,
                            grid: { color: "rgba(255, 255, 255, 0.1)" },
                            ticks: { color: "white" }
                        },
                        x: { grid: { color: "rgba(255, 255, 255, 0.1)" }, ticks: { color: "white" } }
                    }
                }
            });
        } else {
            const barCtx = barChartRef.current.getContext('2d');
            barChartInstance.current = new ChartJS(barCtx, {
                type: 'bar',
                data: {
                    labels: ['Nombre de logements (x100 000)', 'Taux logements sociaux (%)', 'Taux logements vacants (%)'],
                    datasets: [
                        {
                            label: 'Hauts - de - France',
                            data: getRegionalMetric('Hauts-de-France'),
                            backgroundColor: "#8ecae6"
                        },
                        {
                            label: 'Auvergne Rhône - Alpes',
                            data: getRegionalMetric('Auvergne Rhône-Alpes'),
                            backgroundColor: "#219ebc"
                        },
                        {
                            label: 'Réunion',
                            data: getRegionalMetric('Réunion'),
                            backgroundColor: "#023047"
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { position: 'top', labels: { color: 'white' } },
                        title: {
                            display: true,
                            text: 'Indicateurs de logements',
                            color: 'white',
                            font: { size: 16 }
                        },
                        datalabels: {
                            color: 'white',
                            anchor: 'end',
                            align: 'top',
                            offset: 4,
                            font: { weight: 'bold', size: 11 },
                            formatter: (value) => value
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            suggestedMax: 50,
                            grid: { color: "rgba(255, 255, 255, 0.1)" },
                            ticks: { color: "white" }
                        },
                        x: { grid: { color: "rgba(255, 255, 255, 0.1)" }, ticks: { color: "white" } }
                    }
                }
            });
        }

        // Fonction de nettoyage: Détruire les instances si le composant est démonté
        return () => {
            if (barChartInstance.current) barChartInstance.current.destroy();
        };

    }, [logements, population, analysisType]); // L'effet se déclenche quand logements ou population change

    return (
        <div className="flex-1 bg-[#152033] border-2 border-[#233348] rounded-2xl shadow-lg p-6">
            {isLoading ? (
                <div className="flex items-center justify-center h-full">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                </div>
            ) : error ? (
                <div className="flex items-center justify-center h-full text-red-500">
                    Erreur de chargement des données
                </div>
            ) : (
                <canvas ref={barChartRef} analysisType={analysisType === "Analyse globale" ? "Analyse globale" : "Analyse régionale"}></canvas>
            )}
        </div>
    );
};

export default Graph1;