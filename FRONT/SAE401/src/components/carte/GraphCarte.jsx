import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { getPopulation } from "../../services/populationService";
import { getLogements } from "../../services/logementsService";
import ChartDataLabels from "chartjs-plugin-datalabels";

Chart.register(ChartDataLabels);

const GraphCarte = ({ dptId, activeYear }) => {
    //usestate pour les données
    const [DataPopulation, setDataPopulation] = useState(null);
    const [DataLogement, setDataLogement] = useState(null);
    const [loading, setLoading] = useState(true);

    //pour utiliser chartjs
    const chartRef = useRef(null);
    const ChartInstanceRef = useRef(null);
    const chartPie = useRef(null);
    const ChartInstancePie = useRef(null);

    //Récupération des données depuis l'API
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const params = { code_dept: dptId };
                const [PopRes, LogRes] = await Promise.all([
                    getPopulation(params),
                    getLogements(params)
                ]);

                const populationListe = PopRes.data['hydra:member'] || PopRes.data;
                const logementListe = LogRes.data['hydra:member'] || LogRes.data;

                const popAnnee = populationListe.find(a => String(a.annee) === String(activeYear));
                const logAnnee = logementListe.find(a => String(a.annee) === String(activeYear));

                setDataPopulation(popAnnee || null);
                setDataLogement(logAnnee || null);
            } catch (error) {
                console.error("Erreur API :", error);
            } finally {
                setLoading(false); // On arrête le chargement
            }
        };

        if (dptId && activeYear) fetchData();
    }, [dptId, activeYear]);

    // Création du graphique
    useEffect(() => {
        if (!loading && (DataPopulation || DataLogement) && chartRef.current) {
            if (ChartInstanceRef.current) ChartInstanceRef.current.destroy();

            const ctx = chartRef.current.getContext("2d");
            const labels = [];
            const values = [];
            const colors = [];

            // que les données avec un % pour éviter les problèmes d'échelle
            if (DataPopulation) {
                labels.push("Chômage (%)", "Pauvreté (%)");
                values.push(DataPopulation.taux_chomage, DataPopulation.taux_pauvrete);
                colors.push("#023047", "#204ab3ff");
            }
            if (DataLogement) {
                labels.push("L. Sociaux (%)", "L. Vacants (%)");
                values.push(DataLogement.taux_logements_sociaux, DataLogement.taux_logements_vacants);
                colors.push("#219ebc", "#8ecae6");
            }

            ChartInstanceRef.current = new Chart(ctx, {
                type: "bar",
                data: {
                    labels: labels,
                    datasets: [{
                        data: values,
                        backgroundColor: colors,
                        borderWidth: 2,
                        borderColor: "white"
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { 
                        legend: { display: false },
                        datalabels: {
                            color: 'white',
                            align: 'center',
                            offset: 15,
                            textShadowColor: 'black',
                            textShadowBlur: 5,
                            font: {
                                size: 14,
                                weight: 'bold'
                            },
                        }
                    },
                    scales: {
                        y: { beginAtZero: true, ticks: { color: "white" } },
                        x: { ticks: { color: "white" } }
                    }
                }
            });
        }
    }, [loading, DataPopulation, DataLogement]);

    useEffect(() => {
        if (!loading && DataPopulation && chartPie.current) {
            if (ChartInstancePie.current) ChartInstancePie.current.destroy();

            const ctx = chartPie.current.getContext("2d");
            const labelsPie = [];
            const valuesPie = [];
            const colorsPie = [];

            if (DataPopulation) {
                labelsPie.push("Chômage (%)", "Pauvreté (%)", "Accroissement (%)");
                valuesPie.push(DataPopulation.taux_chomage, DataPopulation.taux_pauvrete, DataPopulation.accroissement);
                colorsPie.push("#023047", "#204ab3ff", "#8ecae6");
            }

            ChartInstancePie.current = new Chart(ctx, {
                type: "pie",
                data: {
                    labels: labelsPie,
                    datasets : [{
                        data: valuesPie,
                        backgroundColor: colorsPie,
                        borderWidth: 2,
                        borderColor: "white"
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { 
                            display: true, 
                            position: 'bottom', 
                            align: 'center', 
                            labels: { 
                                color: 'white',
                                font: { size: 11, weight: 'bold' },
                                usePointStyle: true,
                                padding: 15
                            }
                        },
                        datalabels: {
                            color: 'white',
                            align: 'center',
                            offset: 15,
                            textShadowColor: 'black',
                            textShadowBlur: 5,
                            font: {
                                size: 14,
                                weight: 'bold'
                            },
                        },
                    }
                }
            });
        }
    }, [loading, DataPopulation]);

    if (loading) return <div className="p-10 text-blue-400 animate-pulse">Chargement des données...</div>;

    if (!DataPopulation && !DataLogement) return <div className="p-10 text-red-400">Aucune donnée disponible pour {activeYear}</div>;

    return (
        <div className="flex flex-col h-full gap-4">
            <div className="grid grid-cols-[40%_60%] gap-4 flex-1">
                <div className="bg-[#2b3c54] p-5 rounded-xl border border-white/10 flex flex-col justify-center items-center relative w-full h-full min-h-[300px]">
                    <canvas ref={chartPie}></canvas>
                </div>
                <div className="bg-[#2b3c54] p-6 rounded-xl border border-white/10 h-full flex flex-col mr-4">
                    <h1 className="text-white font-bold flex-start mb-4 uppercase tracking-wider">Données textuelles</h1>
                    <table className="w-full border border-white">
                        <thead className="border border-white bg-[#219ebc]">
                            <tr className="border border-white text-center">
                                <th className="text-white border border-white">Nom</th>
                                <th className="text-white border border-white">Valeur</th>
                            </tr>
                        </thead>
                        <tbody className="text-center border border-white">
                            <tr>
                                <td className="text-white border border-white">Nombre d'habitants</td>
                                <td className="text-white border border-white">{DataPopulation?.nb_habitants?.toLocaleString()}</td>
                            </tr>
                            <tr>
                                <td className="text-white border border-white">Accroissement (%)</td>
                                <td className="text-white border border-white">{DataPopulation?.accroissement} %</td>
                            </tr>
                            <tr>
                                <td className="text-white border border-white">Population moins de 20 ans</td>
                                <td className="text-white border border-white">{DataPopulation?.pop_moins_20ans} %</td>
                            </tr>
                            <tr>
                                <td className="text-white border border-white">Population plus de 60 ans</td>
                                <td className="text-white border border-white">{DataPopulation?.pop_plus_60ans} %</td>
                            </tr>
                            <tr>
                                <td className="text-white border border-white">Taux de chômage (%)</td>
                                <td className="text-white border border-white">{DataPopulation?.taux_chomage} %</td>
                            </tr>
                            <tr>
                                <td className="text-white border border-white">Taux de pauvreté (%)</td>
                                <td className="text-white border border-white">{DataPopulation?.taux_pauvrete} %</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            
            <div className="flex-1 min-h-0 bg-[#2b3c54] p-6 rounded-xl border border-white/5">
                <canvas ref={chartRef}></canvas>
            </div>
        </div>
    );
};

export default GraphCarte;
