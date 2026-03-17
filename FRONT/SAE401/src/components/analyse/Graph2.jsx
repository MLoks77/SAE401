import { Chart as ChartJS, registerables } from 'chart.js';
import { useState, useEffect, useRef } from 'react';
import { getLogements } from '../../services/logementsService';
import { getPopulation } from '../../services/populationService';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(...registerables, ChartDataLabels);

const Graph2 = () => {
    const [logements, setLogements] = useState([]);
    const [population, setPopulation] = useState([]);
    const [error, setError] = useState(null);

    // Références vers nos éléments Canvas
    const lineChartRef = useRef(null);

    // Références vers les instances de Chart pour pouvoir les détruire à la mise à jour
    const lineChartInstance = useRef(null);

    useEffect(() => {
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

        if (lineChartInstance.current) {
            lineChartInstance.current.destroy();
        }

        const lineCtx = lineChartRef.current.getContext('2d');
        lineChartInstance.current = new ChartJS(lineCtx, {
            type: 'bar',
            data: {
                labels: ['Densité (hab/km²)', 'Accroissement (x1 000)', 'Taux Pauvreté (%)'],
                datasets: [
                    {
                        label: '2021',
                        data: getGlobalPopMetricForYear(2021),
                        backgroundColor: '#00B4D8'
                    },
                    {
                        label: '2022',
                        data: getGlobalPopMetricForYear(2022),
                        backgroundColor: '#1E13EC'
                    },
                    {
                        label: '2023',
                        data: getGlobalPopMetricForYear(2023),
                        backgroundColor: '#136DED'
                    }
                ]
            },
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

    }, [logements, population]); // L'effet se déclenche quand logements ou population change

    return (
        <div className="flex-1 bg-[#152033] border-2 border-[#233348] rounded-2xl shadow-lg p-6">
            <canvas ref={lineChartRef}></canvas>
        </div>
    );
};

export default Graph2;