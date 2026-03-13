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
                colors.push("#FF6B6B", "#FFD93D");
            }
            if (DataLogement) {
                labels.push("L. Sociaux (%)", "L. Vacants (%)");
                values.push(DataLogement.taux_logements_sociaux, DataLogement.taux_logements_vacants);
                colors.push("#4ECDC4", "#6B46C1");
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

    if (loading) return <div className="p-10 text-blue-400 animate-pulse">Chargement des données...</div>;

    if (!DataPopulation && !DataLogement) return <div className="p-10 text-red-400">Aucune donnée disponible pour {activeYear}</div>;

    return (
        <div className="space-y-8">
            <div className="h-[35vh] bg-[#1F2937] p-6 rounded-2xl border border-white/5">
                <canvas ref={chartRef}></canvas>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#1F2937] p-6 rounded-2xl border border-white/5">
                    <h3 className="text-blue-400 font-bold text-xs uppercase tracking-widest mb-4">Statistiques détaillées</h3>
                    <div className="space-y-3">
                        <p className="flex justify-between text-sm">
                            <span className="text-gray-400">Population :</span>
                            <span className="text-white font-bold">{DataPopulation?.nb_habitants?.toLocaleString()} hab.</span>
                        </p>
                        <p className="flex justify-between text-sm">
                            <span className="text-gray-400">Logements :</span>
                            <span className="text-white font-bold">{DataLogement?.nb_logements?.toLocaleString()}</span>
                        </p>
                        <p className="flex justify-between text-sm">
                            <span className="text-gray-400">Accroissement :</span>
                            <span className={`font-bold ${DataPopulation?.accroissement >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                {DataPopulation?.accroissement.toFixed(2)} %
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GraphCarte;
