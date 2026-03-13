import Chart from "chart.js/auto";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useEffect, useRef } from "react";

Chart.register(ChartDataLabels);

const Graphv1 = () => {

    const chartRef1 = useRef(null);
    const chartItem1 = useRef(null);

    useEffect(() => {
        if (chartRef1.current) {
            const ctx = chartRef1.current.getContext("2d");
            chartItem1.current = new Chart(ctx, {
                type: "bar",
                data: {
                    labels: ["2020", "2021", "2022", "2023", "2024"],
                    datasets: [{
                        label: "Population",
                        data: [100, 200, 300, 400, 500],
                        backgroundColor: "rgba(75, 192, 192, 0.6)",
                        borderColor: "rgba(75, 192, 192, 1)",
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: "top",
                        },
                        title: {
                            display: true,
                            text: "Population par année"
                        }
                    }
                }
            });
        }
        return () => {
            if (chartItem1.current) {
                chartItem1.current.destroy();
            }
        };
    }, []);
    return (
        <div className="w-full h-full flex flex-col gap-4">
            <div className="flex-1 relative">
                <canvas ref={chartRef1}></canvas>
            </div>
        </div>
    );
};

export default Graphv1;