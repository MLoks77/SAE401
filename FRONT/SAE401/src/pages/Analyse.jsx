import Navbar from "../components/navbar";
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend, PointElement } from 'chart.js';
import { useState, useEffect } from 'react';
import { getLogements } from '../services/logementsService';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend, PointElement);

const Analyse = () => {
    const [typeTaux, setTypeTaux] = useState('logements_sociaux');

    // État pour stocker la liste des logements
    const [logements, setLogements] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        // L'appel API est asynchrone, on l'exécute dans un useEffect
        getLogements()
            .then(response => {
                // On met à jour l'état avec les données récupérées
                // Si l'API retourne un tableau direct, on utilise response.data
                const data = Array.isArray(response.data) ? response.data :
                    (response.data['hydra:member'] ? response.data['hydra:member'] : Object.values(response.data));
                setLogements(data);
            })
            .catch(err => {
                console.error("Erreur API : ", err);
                setError(err.message);
            });
    }, []);

    // Affichage d'une erreur si l'API lève une exception (comme une erreur CORS)
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

    // Préparer les données pour le graphique
    const labels = logements.map(logement => logement.code_dept || logement.nom || "Zone");

    const annee2021 = logements.map(logement => logement.annee == 2021);
    const annee2022 = logements.map(logement => logement.annee == 2022);
    const annee2023 = logements.map(logement => logement.annee === 2023);

    const nbLogements = logements.map(logement => logement.nb_logements);

    const tauxLogementsSociaux = logements.map(logement => logement.taux_logements_sociaux || 0);
    const tauxLogementsVacants = logements.map(logement => logement.taux_logements_vacants || 0);

    // Configuration dynamique des données en fonction de l'état (uniquement gardé pour le 2ème graphique Line si besoin)
    const chartData = typeTaux === 'logements_sociaux' ? tauxLogementsSociaux : tauxLogementsVacants;
    const chartLabel = typeTaux === 'logements_sociaux' ? 'Taux de logements sociaux' : 'Taux de logements vacants';
    const chartBgColor = typeTaux === 'logements_sociaux' ? '#13B2EC' : '#FF9F00';
    const chartBorderColor = typeTaux === 'logements_sociaux' ? '#13B2EC' : '#FF9F00';

    // Configuration du graphique en barres avec 3 datasets côte à côte
    const barData = {
        labels: labels,
        datasets: [
            {
                label: '2021',
                data: nbLogements,
                backgroundColor: '#13B2EC'
            },
            {
                label: '2022',
                data: tauxLogementsSociaux,
                backgroundColor: '#1E13EC'
            },
            {
                label: '2023',
                data: tauxLogementsVacants,
                backgroundColor: '#136DED'
            }
        ]
    };

    const barOptions = {
        responsive: true,
        maintainAspectRatio: false, // Permet au graphique de s'ajuster en hauteur selon son conteneur
        plugins: {
            legend: {
                position: 'top',
                labels: { color: 'white' }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: { color: "rgba(255, 255, 255, 0.1)" },
                ticks: { color: "white" },
                title: { display: true, text: 'Pourcentage (%)', color: "white" }
            },
            x: {
                grid: { color: "rgba(255, 255, 255, 0.1)" },
                ticks: { color: "white" }
            }
        }
    };

    // Configuration du graphique en lignes
    // On garde un fond transparent pour la ligne
    const lineData = {
        labels: labels,
        datasets: [{
            label: chartLabel,
            data: chartData,
            backgroundColor: chartBgColor + '33', // Plus transparent pour l'aire, ajout de 20% d'opacité (hex '33') à la couleur Hex
            borderColor: chartBorderColor,
            borderWidth: 2,
            fill: true,
            tension: 0.3 // Courbe les lignes
        }]
    };

    const lineOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                labels: { color: 'white' }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: { color: "rgba(255, 255, 255, 0.1)" },
                ticks: { color: "white" },
                title: { display: true, text: 'Pourcentage (%)', color: "white" }
            },
            x: {
                grid: { color: "rgba(255, 255, 255, 0.1)" },
                ticks: { color: "white" }
            }
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#111822]">
            <Navbar></Navbar>

            <div className="flex-1 flex flex-col gap-8 p-6 mx-auto w-full max-w-7xl">

                <div className="flex flex-col bg-[#1A2432] border border-[#233348] border-2 rounded-2xl shadow-lg h-[35rem]">
                    <div className="flex justify-between items-center p-4 sm:p-6 border-b border-[#233348]">
                        <h1 className="text-white text-xl sm:text-2xl font-semibold">Logements</h1>
                    </div>
                    <div className="flex-1 relative p-4 pl-0">
                        <Bar data={barData} options={barOptions} />
                    </div>
                </div>

                <div className="flex flex-col bg-[#1A2432] border border-[#233348] border-2 rounded-2xl shadow-lg h-[35rem] mb-8">
                    <div className="flex justify-between items-center p-4 sm:p-6 border-b border-[#233348]">
                        <h1 className="text-white text-xl sm:text-2xl font-semibold">Population</h1>
                    </div>
                    <div className="flex-1 relative p-4 pl-0">
                        <Line data={lineData} options={lineOptions} />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Analyse;