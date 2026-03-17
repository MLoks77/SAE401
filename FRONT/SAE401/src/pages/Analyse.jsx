import Navbar from "../components/navbar";
import Texte from "../components/analyse/TexteRegionale";
import Graph1 from "../components/analyse/Graph1";
import Graph2 from "../components/analyse/Graph2";
import { useState } from 'react';

const Analyse = () => {
    const [error, setError] = useState(null);

    if (error) {
        return (
            <div className="h-screen flex flex-col overflow-hidden bg-[#111822]">
                <Navbar></Navbar>
                <div className="flex-1 flex flex-col items-center justify-center text-red-500 text-xl text-center p-5">
                    <p>Erreur lors du chargement des données ({error}).</p>
                    <p className="text-sm mt-3 text-white max-w-xl">
                        Erreur de fetch
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="h-screen flex flex-col overflow-hidden bg-[#111822]">
            <Navbar />
            <div className="flex-1 flex flex-row gap-4 p-4 pb-8 overflow-hidden">
                <Texte />
                <div className="flex-1 flex flex-col gap-4">
                    <Graph1 />
                    <Graph2 />
                </div>
            </div>
        </div>
    );
};

export default Analyse;