// https://www.chartjs.org/docs/latest/developers/api.html
// myLineChart.toBase64Image();
// => returns png data url of the image on the canvas
// myLineChart.toBase64Image('image/jpeg', 1)
// => returns a jpeg data url in the highest quality of the canvas

// bouton export
const BtnExport = ({ chartRef }) => {

    const exportpng = () => {
        const chart = chartRef.current; // recupere le graph via la ref persistée
        if (chart) {
            const base64Image = chart.toBase64Image(); // Génère l'image
            if (base64Image) {
                const link = document.createElement('a'); // crée un lien
                link.href = base64Image; // lien vers l'image
                link.download = 'DATAVIZ_MonGraph.png'; // nom du graph exporté
                link.click(); // déclenche le téléchargement
            }
        };
    }
    return (
        <div className="p-4 border-t border-[#334155] bg-[#1A2432]">
            <button onClick={exportpng} className="w-full bg-blue-800 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors cursor-pointer active:scale-[0.98]">
                Exporter la visualisation
            </button>
        </div>
    );
};

export default BtnExport;
