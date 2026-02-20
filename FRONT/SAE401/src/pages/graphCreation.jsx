import Navbar from "../components/navbar";
import BtnYear from "../components/btnYear";
import { useState } from "react";

// par maxime derènes

const GraphCreation = () => {

    const graphType = [
        { type: "Histogramme", icon: "./images/graphicons/histogram.png" },
        { type: "Camembert", icon: "./images/graphicons/camembert.png" },
        { type: "Courbe", icon: "./images/graphicons/courbe.png" },
    ];

    const taillegraph = "50px"

    const [activeGraphType, setActiveGraphType] = useState(graphType);

    const titres = ["Type de visualisation", "Données", "Filtres"];

    return (
        <div>
            <Navbar></Navbar>
            <BtnYear></BtnYear>

            <section>

                <div className="grid grid-cols-3 grid-rows-1 gap-0">
                    <div className="bg-[#1A2432]">
                        <div className="grid grid-cols-1 grid-rows-5 gap-4 mt-2">


                            <div className="row-start-1 mt-5 mx-5">
                                <h1 className="text-[24px] text-white font-bold">Concevez et Exportez </h1>
                                <p className="text-[#D2D2D2] text-lg">Concevez <span className="underline underline-offset-2">votre propre graphe</span> en utilisant les données des parcs sociaux français.</p>
                            </div>


                            <div className="row-start-2 mx-5">
                                <div className="flex items-center gap-2">
                                    <p className="border border-white bg-blue-600 rounded-full px-2 text-white">1</p>
                                    <h1 className="text-[#D2D2D2] text-lg font-bold px-2">{titres[0]}</h1>
                                </div>
                                {/* Grille pour choisir les graphs */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
                                    {graphType.map((g) => {
                                        const isActive = activeGraphType.type === g.type;
                                        return (
                                            <button key={g.type}
                                                className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer text-white transition-colors ${isActive ? "bg-[#133479] border border-blue-400" : "bg-[#111822] hover:bg-[#1A2A40]"}`}
                                                onClick={() => setActiveGraphType(g)}
                                            >
                                                <img src={g.icon} alt={g.type} className="mb-3 object-contain" style={{ width: taillegraph, height: taillegraph }} />
                                                <h2 className="font-semibold text-sm md:text-base">{g.type}</h2>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>


                            <div className="row-start-3 mx-5">
                                <div className="flex items-center gap-2">
                                    <p className="border border-white bg-blue-600 rounded-full px-2 text-white">2</p>
                                    <h1 className="text-[#D2D2D2] text-lg font-bold px-2">{titres[1]}</h1>
                                </div>
                            </div>


                            <div className="row-start-4 mx-5">
                                <div className="flex items-center gap-2">
                                    <p className="border border-white bg-blue-600 rounded-full px-2 text-white">3</p>
                                    <h1 className="text-[#D2D2D2] text-lg font-bold px-2">{titres[2]}</h1>
                                </div>
                            </div>


                            <div className="row-start-5 bg-[#152033]">
                                <button className="flex items-center justify-center w-[600px] border border-blue-400 bg-[#133479] rounded-lg h-12 text-white">
                                    <p>Exporter</p>
                                </button>
                            </div>


                        </div>
                    </div>





                    {/* Canva Graphique */}
                    <div className="col-span-2 bg-[#111822]">
                        <canvas id="graph"></canvas>
                    </div>
                </div>

            </section>
        </div>
    );
};

export default GraphCreation;