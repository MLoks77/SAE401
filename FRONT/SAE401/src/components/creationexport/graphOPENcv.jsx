import Chart from "chart.js/auto";
import { useState, useRef, useEffect } from "react";



const GraphOPENcv = ({ activeGraphType }) => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    // le graph
    // Initialisation et mise à jour du graphique
    useEffect(() => {
        if (chartRef.current) {
            // Détruire l'instance existante avant d'en créer une nouvelle
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }

            const ctx = chartRef.current.getContext("2d");
            chartInstance.current = new Chart(ctx, {
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
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [activeGraphType]);

    return (
        <div className="col-span-2 bg-[#111822] relative p-8">
            <canvas ref={chartRef} id="graph" className="w-auto h-auto"></canvas>
        </div>
    );
}

export default GraphOPENcv;
