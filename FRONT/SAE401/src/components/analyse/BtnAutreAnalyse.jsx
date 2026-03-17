const BtnAutreAnalyse = ({ analysisType, setAnalysisType }) => {
    return (
        <button
            onClick={() => setAnalysisType(analysisType === 'Analyse globale' ? 'Analyse régionale' : 'Analyse globale')}
            className="px-4 py-2 bg-[#1A2A40] border border-white/30 text-white rounded-md hover:bg-[#233348] transition duration-300 text-sm font-bold shadow-sm"
        >
            {analysisType === 'Analyse globale' ? 'Voir l\'analyse régionale' : 'Voir l\'analyse globale'}
        </button>
    );
};

export default BtnAutreAnalyse;