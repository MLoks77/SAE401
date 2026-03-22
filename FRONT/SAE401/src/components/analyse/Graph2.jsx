import { Chart as ChartJS, registerables } from 'chart.js';
import { useState, useEffect, useRef } from 'react';
import { getLogements } from '../../services/logementsService';
import { getPopulation } from '../../services/populationService';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(...registerables, ChartDataLabels);

const Graph2 = ({ analysisType }) => {
    const [logements, setLogements] = useState([]);
    const [population, setPopulation] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false); // État de chargement de l'api

    // Références vers nos éléments Canvas
    const lineChartRef = useRef(null);
    const regionsMapping = {
        'Hauts-de-France': ['02', '59', '60', '62', '80'],
        'Auvergne Rhône-Alpes': ['01', '03', '07', '15', '26', '38', '42', '43', '63', '69', '73', '74'],
        'Réunion': ['974']
    };

    // Références vers les instances de Chart pour pouvoir les détruire à la mise à jour
    const lineChartInstance = useRef(null);

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

        const getGlobalPopMetricForYear = (year) => {
            const yearData = population.filter(p => p.annee == year);
            if (yearData.length === 0) return [0, 0, 0];

            const avgDensite = yearData.reduce((acc, curr) => acc + (Number(curr.densite) || 0), 0) / yearData.length;
            const totalSoldeHumain = yearData.reduce((acc, curr) => acc + (Number(curr.accroissement) || 0), 0);
            const avgPauvrete = yearData.reduce((acc, curr) => acc + (Number(curr.taux_pauvrete) || 0), 0) / yearData.length;

            // Échelle harmonisée : densités et accroissements divisés par 10 pour être comparables au taux de pauvreté (~15)
            return [
                Math.round((avgDensite / 10) * 10) / 10,
                Math.round((totalSoldeHumain / 10) * 10) / 10,
                Math.round(avgPauvrete * 10) / 10
            ];
        };

        const getRegionalPopMetric = (regionName) => {
            const codes = regionsMapping[regionName];
            const regionData = population.filter(p => codes.includes(p.code_dept) && p.annee === 2023);

            if (regionData.length === 0) return [0, 0, 0];

            const avgDensite = regionData.reduce((acc, curr) => acc + (Number(curr.densite) || 0), 0) / regionData.length;
            const totalSoldeHumain = regionData.reduce((acc, curr) => acc + (Number(curr.accroissement) || 0), 0);
            const avgPauvrete = regionData.reduce((acc, curr) => acc + (Number(curr.taux_pauvrete) || 0), 0) / regionData.length;

            return [
                Math.round((avgDensite / 10) * 10) / 10,
                Math.round((totalSoldeHumain / 10) * 10) / 10,
                Math.round(avgPauvrete * 10) / 10
            ];
        };

        if (lineChartInstance.current) {
            lineChartInstance.current.destroy();
        }

        const lineCtx = lineChartRef.current.getContext('2d');

        const chartData = analysisType === 'Analyse globale' ? {
            labels: ['Densité (hab/km²)', 'Accroissement (x1 000)', 'Taux Pauvreté (%)'],
            datasets: [
                {
                    label: '2021',
                    data: getGlobalPopMetricForYear(2021),
                    backgroundColor: "#8ecae6"
                },
                {
                    label: '2022',
                    data: getGlobalPopMetricForYear(2022),
                    backgroundColor: "#219ebc"
                },
                {
                    label: '2023',
                    data: getGlobalPopMetricForYear(2023),
                    backgroundColor: "#023047"
                }
            ]
        } : {
            labels: ['Densité (hab/km²)', 'Accroissement (x1 000)', 'Taux Pauvreté (%)'],
            datasets: [
                {
                    label: 'Hauts-de-France',
                    data: getRegionalPopMetric('Hauts-de-France'),
                    backgroundColor: "#8ecae6"
                },
                {
                    label: 'Auvergne Rhône-Alpes',
                    data: getRegionalPopMetric('Auvergne Rhône-Alpes'),
                    backgroundColor: "#219ebc"
                },
                {
                    label: 'Réunion',
                    data: getRegionalPopMetric('Réunion'),
                    backgroundColor: "#023047"
                }
            ]
        };

        lineChartInstance.current = new ChartJS(lineCtx, {
            type: 'bar',
            data: chartData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'top', labels: { color: 'white' } },
                    title: { display: true, text: 'Indicateurs de population', color: 'white', font: { size: 16 } },
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
                        suggestedMax: 80,
                        grid: { color: "rgba(255, 255, 255, 0.1)" },
                        ticks: { color: "white" },

                    },
                    x: { grid: { color: "rgba(255, 255, 255, 0.1)" }, ticks: { color: "white" } }
                }
            }
        });

        // Fonction de nettoyage: Détruire les instances si le composant est démonté
        return () => {
            if (lineChartInstance.current) lineChartInstance.current.destroy();
        };

    }, [logements, population, analysisType]); // Ajout de analysisType dans les dépendances

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
                <canvas ref={lineChartRef}></canvas>
            )}
        </div>
    );
};

export default Graph2;