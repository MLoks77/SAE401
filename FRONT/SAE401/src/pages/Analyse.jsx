import Navbar from "../components/navbar";
import { Chart as ChartJS, registerables } from 'chart.js';
import { useState, useEffect, useRef } from 'react';
import { getLogements } from '../services/logementsService';
import { getPopulation } from '../services/populationService';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(...registerables, ChartDataLabels);

const Analyse = () => {
    const [typeTaux, setTypeTaux] = useState('logements_sociaux');
    const [logements, setLogements] = useState([]);
    const [population, setPopulation] = useState([]);
    const [error, setError] = useState(null);

    // Références vers nos éléments Canvas
    const barChartRef = useRef(null);
    const lineChartRef = useRef(null);

    // Références vers les instances de Chart pour pouvoir les détruire à la mise à jour
    const barChartInstance = useRef(null);
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

        if (barChartInstance.current) {
            barChartInstance.current.destroy();
        }

        const barCtx = barChartRef.current.getContext('2d');
        barChartInstance.current = new ChartJS(barCtx, {
            type: 'bar',
            data: {
                labels: ['Nombre de logements (x100 000)', 'Taux logements sociaux (%)', 'Taux logements vacants (%)'],
                datasets: [
                    {
                        label: '2021',
                        data: getGlobalMetricForYear(2021),
                        backgroundColor: '#00B4D8'
                    },
                    {
                        label: '2022',
                        data: getGlobalMetricForYear(2022),
                        backgroundColor: '#1E13EC'
                    },
                    {
                        label: '2023',
                        data: getGlobalMetricForYear(2023),
                        backgroundColor: '#136DED'
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
                        title: { display: true, text: 'Valeur', color: "white" }
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

    }, [logements, population]); // L'effet se déclenche quand logements ou population change


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
        <div className="h-screen flex flex-col overflow-hidden bg-[#111822]">
            <Navbar />

            <div className="flex-1 flex flex-row gap-4 p-4 pb-8 overflow-hidden">
                <div className="flex-1 flex flex-col bg-[#152033] border-2 border-[#233348] text-white rounded-2xl shadow-lg p-6 overflow-y-auto">
                    <h2 className="text-2xl font-bold mb-6 top-0 bg-[#152033] py-2">Analyse régionale</h2>
                    <div className="space-y-6 text-left">
                        <section>
                            <h3 className="text-xl font-semibold text-[#00B4D8] mb-2">1. Dynamique Démographique : Le Grand Écart</h3>
                            <p>On observe deux visages très différents de la France :</p>
                            <ul className="list-disc pl-5 mt-2 space-y-2">
                                <li><strong>Les pôles d'attractivité :</strong> L'Occitanie (O), l'Auvergne-Rhône-Alpes (ARA) et l'Île-de-France (IDF) affichent les plus forts taux d'accroissement (entre 36 % et 54 % en cumulé sur les données fournies). L'Occitanie se distingue particulièrement par une croissance explosive.</li>
                                <li><strong>Les régions en déclin ou stagnation :</strong> La Bourgogne Franche-Comté (BFC), le Grand Est (GE) et la Normandie (N) montrent des signes de fragilité avec un accroissement négatif ou proche de zéro. La BFC perd notamment des habitants régulièrement sur les trois relevés.</li>
                                <li><strong>Le cas particulier de la Guyane :</strong> Avec 41 % de sa population ayant moins de 20 ans (contre environ 22 % en métropole), la Guyane est la région la plus jeune. C'est une dynamique démographique unique qui explique ses besoins massifs en infrastructures.</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="text-xl font-semibold text-[#00B4D8] mb-2">2. Emploi : Une amélioration généralisée</h3>
                            <p>La donnée la plus frappante est la baisse du chômage partout en France entre 2021 et 2023.</p>
                            <ul className="list-disc pl-5 mt-2 space-y-2">
                                <li><strong>Les records de baisse :</strong> La Guyane (-6,9 points) et la Martinique (-5,62 points) enregistrent des chutes spectaculaires du chômage.</li>
                                <li><strong>Le plein emploi relatif :</strong> La Bretagne (B), les Pays de la Loire (L) et l'Auvergne-Rhône-Alpes (ARA) sont les "bons élèves" avec des taux passant sous la barre des 6 %, se rapprochant du plein emploi technique.</li>
                                <li><strong>La persistance du chômage élevé :</strong> Malgré les baisses, les Outre-mer (Guadeloupe à 19,30 % et Réunion à 17,10 %) ainsi que les Hauts-de-France (HDF) et PACA restent bien au-dessus de la moyenne nationale.</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="text-xl font-semibold text-[#00B4D8] mb-2">3. Précarité et Pauvreté : Un lien complexe</h3>
                            <p>La baisse du chômage n'entraîne pas toujours une baisse équivalente de la pauvreté.</p>
                            <ul className="list-disc pl-5 mt-2 space-y-2">
                                <li><strong>Stabilité de la pauvreté :</strong> Dans des régions comme l'ARA ou la Bretagne, la pauvreté reste stable ou augmente très légèrement malgré la baisse du chômage. Cela suggère une augmentation des "travailleurs pauvres".</li>
                                <li><strong>Les régions "riches" mais précaires :</strong> L'Île-de-France a un chômage modéré (6,94 %) mais un taux de pauvreté assez élevé (15,39 %), lié au coût de la vie très important.</li>
                                <li><strong>Les contrastes territoriaux :</strong> La Réunion et la Martinique, bien qu'en progrès, affichent des taux de pauvreté records (respectivement 35,6 % et 26,7 %), soulignant des fractures sociales structurelles.</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="text-xl font-semibold text-[#00B4D8] mb-2">4. Vieillissement de la population</h3>
                            <p>Le "papy-boom" est visible dans les chiffres de la population de plus de 60 ans :</p>
                            <ul className="list-disc pl-5 mt-2 space-y-2">
                                <li><strong>Les régions "Seniors" :</strong> La Nouvelle-Aquitaine (NA) et l'Occitanie (O) dépassent les 32 % de population de plus de 60 ans. Ces régions doivent déjà adapter leurs services (santé, logement, transports).</li>
                                <li><strong>La jeunesse des DROM :</strong> À l'inverse, la Guyane (9 %) et la Réunion (18-19 %) restent très "jeunes", ce qui déplace l'enjeu vers l'éducation et l'insertion professionnelle des moins de 20 ans.</li>
                            </ul>
                        </section>
                    </div>
                </div>

                <div className="flex-1 flex flex-col gap-4">
                    <div className="flex-1 bg-[#152033] border-2 border-[#233348] rounded-2xl shadow-lg p-6">
                        <canvas ref={barChartRef}></canvas>
                    </div>

                    <div className="flex-1 bg-[#152033] border-2 border-[#233348] rounded-2xl shadow-lg p-6">
                        <canvas ref={lineChartRef}></canvas>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analyse;