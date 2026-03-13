import Navbar from "../components/navbar";
import { Chart as ChartJS, registerables } from 'chart.js';
import { useState, useEffect, useRef } from 'react';
import { getLogements } from '../services/logementsService';

ChartJS.register(...registerables);

const Analyse = () => {
    const [typeTaux, setTypeTaux] = useState('logements_sociaux');
    const [logements, setLogements] = useState([]);
    const [error, setError] = useState(null);

    // Références vers nos éléments Canvas
    const barChartRef = useRef(null);
    const lineChartRef = useRef(null);

    // Références vers les instances de Chart pour pouvoir les détruire à la mise à jour
    const barChartInstance = useRef(null);
    const lineChartInstance = useRef(null);

    useEffect(() => {
        getLogements()
            .then(response => {
                const data = Array.isArray(response.data) ? response.data :
                    (response.data['hydra:member'] ? response.data['hydra:member'] : Object.values(response.data));
                setLogements(data);
            })
            .catch(err => {
                console.error("Erreur API : ", err);
                setError(err.message);
            });
    }, []);

    // Effet pour dessiner et mettre à jour les graphiques quand les données ou l'état changent
    useEffect(() => {
        if (logements.length === 0) return; // Ne rien dessiner si pas de données

        // Préparation des données
        const uniqueDeps = [...new Set(logements.map(l => l.code_dept || l.nom || "Zone"))].sort();
        const labels = uniqueDeps;

        const getMetricForYear = (year, metric) => {
            return uniqueDeps.map(dep => {
                const record = logements.find(l => (l.code_dept === dep || l.nom === dep) && l.annee == year);
                return record ? record[metric] : 0;
            });
        };

        if (barChartInstance.current) {
            barChartInstance.current.destroy();
        }

        const barCtx = barChartRef.current.getContext('2d');
        barChartInstance.current = new ChartJS(barCtx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: '2021',
                        data: getMetricForYear(2021, 'nb_logements'),
                        backgroundColor: '#13B2EC'
                    },
                    {
                        label: '2022',
                        data: getMetricForYear(2022, 'nb_logements'),
                        backgroundColor: '#1E13EC'
                    },
                    {
                        label: '2023',
                        data: getMetricForYear(2023, 'nb_logements'),
                        backgroundColor: '#136DED'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'top', labels: { color: 'white' } },
                    title: { display: true, text: 'Évolution du nombre de logements', color: 'white', font: { size: 16 } }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: "rgba(255, 255, 255, 0.1)" },
                        ticks: { color: "white" },
                        title: { display: true, text: 'Quantité', color: "white" }
                    },
                    x: { grid: { color: "rgba(255, 255, 255, 0.1)" }, ticks: { color: "white" } }
                }
            }
        });

        if (lineChartInstance.current) {
            lineChartInstance.current.destroy();
        }

        const metricToUse = typeTaux === 'logements_sociaux' ? 'taux_logements_sociaux' : 'taux_logements_vacants';

        const lineCtx = lineChartRef.current.getContext('2d');
        lineChartInstance.current = new ChartJS(lineCtx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: '2021',
                        data: getMetricForYear(2021, metricToUse),
                        borderColor: '#13B2EC', backgroundColor: '#13B2EC33',
                        borderWidth: 2, fill: true, tension: 0.3
                    },
                    {
                        label: '2022',
                        data: getMetricForYear(2022, metricToUse),
                        borderColor: '#1E13EC', backgroundColor: '#1E13EC33',
                        borderWidth: 2, fill: true, tension: 0.3
                    },
                    {
                        label: '2023',
                        data: getMetricForYear(2023, metricToUse),
                        borderColor: '#136DED', backgroundColor: '#136DED33',
                        borderWidth: 2, fill: true, tension: 0.3
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'top', labels: { color: 'white' } },
                    title: { display: true, text: 'Évolution du taux de logements sociaux (%)', color: 'white', font: { size: 16 } }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: "rgba(255, 255, 255, 0.1)" },
                        ticks: { color: "white" },
                        title: { display: true, text: 'Pourcentage (%)', color: "white" }
                    },
                    x: { grid: { color: "rgba(255, 255, 255, 0.1)" }, ticks: { color: "white" } }
                }
            }
        });

        // Fonction de nettoyage: Détruire les instances si le composant est démonté
        return () => {
            if (barChartInstance.current) barChartInstance.current.destroy();
            if (lineChartInstance.current) lineChartInstance.current.destroy();
        };

    }, [logements, typeTaux]); // L'effet se déclenche quand logements ou typeTaux change


    if (error) {
        return (
            <div className="h-screen flex flex-col overflow-hidden bg-[#111822]">
                <Navbar></Navbar>
                <div className="flex-1 flex flex-col items-center justify-center text-red-500 text-xl text-center p-5">
                    <p>Erreur lors du chargement des données ({error}).</p>
                    <p className="text-sm mt-3 text-white max-w-xl">
                        C'est probablement dû à une erreur du CORS. Vérifier que le backend (Symfony) autorise les requêtes provenant de http://localhost:5173.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-[#111822]">
            <Navbar></Navbar>

            <div className="flex-1 flex flex-col gap-8 p-6 mx-auto w-full max-w-7xl">

                <div className="flex flex-col bg-[#1A2432] border border-[#233348] border-2 rounded-2xl shadow-lg h-[35rem]">
                    <div className="flex justify-between items-center p-4 sm:p-6 border-b border-[#233348]">
                        <h1 className="text-white text-xl sm:text-2xl font-semibold">Logements</h1>
                    </div>
                    <div className="flex-1 relative p-4 pl-0 min-h-0">
                        <canvas ref={barChartRef}></canvas>
                    </div>
                </div>

                <div className="flex flex-col bg-[#1A2432] border border-[#233348] border-2 rounded-2xl shadow-lg h-[35rem] mb-8">
                    <div className="flex justify-between items-center p-4 sm:p-6 border-b border-[#233348]">
                        <h1 className="text-white text-xl sm:text-2xl font-semibold">Population</h1>
                    </div>
                    <div className="flex-1 relative p-4 pl-0 min-h-0">
                        <canvas ref={lineChartRef}></canvas>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Analyse;