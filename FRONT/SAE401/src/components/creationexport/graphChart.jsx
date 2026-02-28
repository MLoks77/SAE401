import Chart from "chart.js/auto";
import { useRef, useEffect, forwardRef, useImperativeHandle } from "react";


// const [activeGraphType, setActiveGraphType] = useState(graphType[0]); // utilise le premier graph : historigramme
// activeGraphType est utilisé comme un props du parent, donc sa reçoit le type de graph des 3 boutons
const GraphChart = forwardRef(({ activeGraphType }, ref) => {
    const chartRef = useRef(null);
    const chartItem = useRef(null); // const graph pour l'export en image

    // https://react.dev/reference/react/useImperativeHandle
    // Expose le chartItem au parent via la ref
    useImperativeHandle(ref, () => ({
        toBase64Image: () => {
            return chartItem.current ? chartItem.current.toBase64Image() : null;
        }
    }));

    // Initialisation 
    useEffect(() => {
        if (chartRef.current && activeGraphType) {
            // Détruire l'instance existante avant d'en créer une nouvelle
            if (chartItem.current) {
                chartItem.current.destroy();
            }

            const ctx = chartRef.current.getContext("2d");
            chartItem.current = new Chart(ctx, {
                // type de graph
                type: activeGraphType?.type === "Histogramme" ? "bar" : activeGraphType?.type === "Camembert" ? "pie" : "line",
                // données = fictive pour le moment à changer après
                data: {
                    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                    datasets: [{
                        label: "Données de test",
                        data: [12, 19, 3, 5, 2, 3],
                        backgroundColor: activeGraphType?.type === "Camembert"
                            ? ["#3b82f6", "#ef4444", "#10b981", "#f59e0b", "#6366f1", "#8b5cf6"]
                            : "#3b82f6",
                        borderColor: "#3b82f6",
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true, // rend le graph responsive
                    maintainAspectRatio: false, // permet de définir la taille du graph
                    plugins: {
                        legend: {
                            labels: { color: "white" } // couleur des légendes
                        }
                    },
                    scales: activeGraphType?.type !== "Camembert" ? {
                        y: {
                            beginAtZero: true, // commence à 0
                            grid: { color: "rgba(255, 255, 255, 0.1)" }, // couleur des lignes
                            ticks: { color: "white" } // couleur des axes
                        },
                        x: {
                            grid: { color: "rgba(255, 255, 255, 0.1)" }, // couleur des lignes
                            ticks: { color: "white" } // couleur des axes
                        }
                    } : {}
                }
            });
        }
        // Nettoyage quand on change de graph
        return () => {
            if (chartItem.current) {
                chartItem.current.destroy();
            }
        };
    }, [activeGraphType]);

    return (
        <div className="col-span-2 bg-[#111822] p-8 h-full flex flex-col items-center justify-center">
            {activeGraphType ? (
                <div className="flex-1 relative min-h-0 w-full">
                    <canvas ref={chartRef} id="graph"></canvas>
                </div>
            ) : (
                <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto">
                        <svg className="w-8 h-8 text-blue-500 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                    </div>
                    <p className="text-[#94a3b8] font-medium italic">Veuillez choisir un type de graphique pour commencer la visualisation</p>
                </div>
            )}
        </div>
    );
});

export default GraphChart;
