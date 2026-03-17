import Navbar from "../components/navbar";
import Texte from "../components/analyse/Texte";
import Graph1 from "../components/analyse/Graph1";
import Graph2 from "../components/analyse/Graph2";
import { Chart as ChartJS, registerables } from 'chart.js';
import { useState } from 'react';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(...registerables, ChartDataLabels);

const Analyse = () => {
    const [error, setError] = useState(null);
    const [analysisType, setAnalysisType] = useState('Analyse globale');

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
            <Navbar analysisType={analysisType} setAnalysisType={setAnalysisType} />
            <div className="flex-1 flex flex-row gap-4 p-4 pb-8 overflow-hidden">
                <Texte analysisType={analysisType} />
                <div className="flex-1 flex flex-col gap-4">
                    <Graph1 analysisType={analysisType} />
                    <Graph2 analysisType={analysisType} />
                </div>
            </div>
        </div>
    );
};

export default Analyse;