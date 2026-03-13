import Chart from "chart.js/auto";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useEffect, useRef } from "react";

Chart.register(ChartDataLabels);

const Graphv2 = () => {

    const chartRef2 = useRef(null);
    const chartItem2 = useRef(null);

    useEffect(() => {
        if (chartRef2.current) {
            const ctx = chartRef2.current.getContext("2d");
            chartItem2.current = new Chart(ctx, {
                type: "bar",
                data: {
                    labels: ["2021", "2022", "2023"],
                    datasets: [{
                        label: "Population",
                        data: [100, 200, 300],
                        backgroundColor: ["#8ecae6", "#219ebc", "#023047"],
                        borderColor: "white",
                        borderWidth: 1,
                        fill: "white",
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: "top",
                            labels: {
                                color: 'white',
                            }
                        },
                        title: {
                            display: true,
                            text: "Population par année",
                            color: 'white',
                            font: {
                                size: 18,
                                weight: 'bold'
                            },
                        },
                        datalabels: {
                            color: '#ecececff',
                            textShadowColor: 'black',
                            textShadowBlur: 5,
                            font: {
                                size: 16,
                                weight: 'bold'
                            },
                            align: 'bottom',
                            offset: 15,
                        }
                    }
                }
            });
        }
        return () => {
            if (chartItem2.current) {
                chartItem2.current.destroy();
            }
        };
    }, []);

    return (
        <div className="w-full h-full flex flex-col gap-4">
            <div className="flex-1 relative">
                <canvas ref={chartRef2}></canvas>
            </div>
        </div>
    );
};

export default Graphv2;