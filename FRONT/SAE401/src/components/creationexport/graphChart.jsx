import Chart from "chart.js/auto";
import { useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import favicon from "/favicon/favicon.ico";

// API
import {
    getDepartementsChoixZone,
    getRegionsChoixZone,
    getNbrLogement,
    getTauxLogementSociaux,
    getTauxLogementVacants,
    getNbrHabitants,
    getAccroissementPopulation,
    getPopulationMoins20ans,
    getPopulationPlus60ans,
    getTauxChomage,
    getTauxPauvrete
} from "../../services/ServicesPages/GraphCreation";


// ----------------- GRAPH -----------------

// forward ref permet de pointer des données du parent vers le composant
const GraphChart = forwardRef(({
    activeGraphType,
    isReady,
    selectedMetriques,
    selectedAxe,
    selectedRegion,
    selectedY1,
    selectedY2,
    setDepartementvalues,
    setRegionvalues
}, ref) => {
    const chartRef = useRef(null);
    const chartItem = useRef(null); // const graph pour l'export en image

    // https://react.dev/reference/react/useImperativeHandle
    // Expose le chartItem au parent via la ref et permet l'export
    useImperativeHandle(ref, () => ({
        toBase64Image: () => {
            return chartItem.current ? chartItem.current.toBase64Image() : null;
        }
    }));

    //selected metriques
    // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Statements/switch
    // switch case, permet de gérer les conditions sans a a voir à spam des if else
    let dataMetrique = [];
    switch (selectedMetriques.value) {
        case "nb_logements":
            dataMetrique = getNbrLogement(selectedRegion.value);
            break;
        case "taux_logements_sociaux":
            dataMetrique = getTauxLogementSociaux(selectedRegion.value);
            break;
        case "taux_logements_vacants":
            dataMetrique = getTauxLogementVacants(selectedRegion.value);
            break;
        case "nb_habitants":
            dataMetrique = getNbrHabitants(selectedRegion.value);
            break;
        case "accroissement_population":
            dataMetrique = getAccroissementPopulation(selectedRegion.value);
            break;
        case "pop_moins_20ans":
            dataMetrique = getPopulationMoins20ans(selectedRegion.value);
            break;
        case "pop_plus_60ans":
            dataMetrique = getPopulationPlus60ans(selectedRegion.value);
            break;
        case "taux_chomage":
            dataMetrique = getTauxChomage(selectedRegion.value);
            break;
        case "taux_pauvrete":
            dataMetrique = getTauxPauvrete(selectedRegion.value);
            break;
        default:
            break;
    }

    //selected Axe
    let dataAxe = [];
    switch (selectedAxe.value) {
        case "departement":
            dataAxe = getDepartement(selectedRegion.value);
            break;
        case "region":
            dataAxe = getRegion(selectedRegion.value);
            break;
        default:
            break;
    }

    //selected Region / departement
    let dataRegion = [];
    switch (selectedRegion.value) {
        case "departement":
            dataRegion = getDepartement(selectedRegion.value);
            break;
        case "region":
            dataRegion = getRegion(selectedRegion.value);
            break;
        default:
            break;
    }

    // choix des années + gestion des données dedans :
    // le choix des années va impacter sur la taille du graph [ 2021, 2022, 2023 ]
    const début = Math.min(Number(selectedY1.value), Number(selectedY2.value)); // on prend la plus petite année
    const fin = Math.max(Number(selectedY1.value), Number(selectedY2.value)); // on prend la plus grande année

    const annees = []; // on stock les années dans un tableau

    for (let year = début; year <= fin; year++) { // on boucle du début à la fin pour remplir le tableau
        annees.push(year);
    }

    // dataMetrique = données API, A MODIFIER
    const dataAffichee = annees.map(annee => {
        // On cherche la valeur correspondant à l'année dans tes données réelles
        const record = dataMetrique.find(d => Number(d.annee) === annee);
        return record ? record.valeur : 0; // Met 0 si l'année n'existe pas
    });

    //  fetch api pour departement et regions
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [deptsRes, regionsRes] = await Promise.all([
                    getDepartementsChoixZone(), // ramène : nom_dept
                    getRegionsChoixZone() // ramène : nom_region
                ]);
                setDepartementvalues(deptsRes); // deptsRes = []
                setRegionvalues(regionsRes); // regionsRes = []
            } catch (error) {
                console.error("Erreur lors du fetch", error);
            }
        };
        fetchData();
    }, []);

    // Faire une requête qui prend en compte : l'année, le departement ou la region et la metrique a l'api, ce qui permettra d'afficher ce que l'utilisateur veut

    // Initialisation 
    useEffect(() => {
        if (chartRef.current && activeGraphType && isReady) {
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
                    labels: annees,
                    datasets: [{
                        label: "Données de test",
                        data: [1, 2, 3],
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
                    scales: activeGraphType?.type !== "Camembert" ? { // si c'est pas camembert
                        y: {
                            beginAtZero: false, // commence à 0
                            grid: { color: "rgba(255, 255, 255, 0.1)" },
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
    }, [activeGraphType, isReady]);

    return (
        <div className="col-span-2 bg-[#111822] p-8 h-full flex flex-col items-center justify-center">
            {isReady ? (
                <div className="flex-1 relative min-h-0 w-full">
                    <canvas ref={chartRef} id="graph"></canvas>
                </div>
            ) : (
                <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto">
                        <img src={favicon} alt="Logo" className="w-8 h-8" />
                    </div>
                    <p className="text-[#94a3b8] font-medium italic">Veuillez remplir les 3 étapes pour commencer la visualisation </p>
                </div>
            )}
        </div>
    );
});

export default GraphChart;
