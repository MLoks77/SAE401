const BtnAutreAnalyse = ({ analysisType, setAnalysisType }) => {
    return (
        <button
            onClick={() => setAnalysisType(analysisType === 'Analyse globale' ? 'Analyse régionale' : 'Analyse globale')}
            className="text-white p-2 font-semibold hoverbar ring-gray-200 ring-1 bg-gray-800 cursor-pointer"
        >
            {analysisType === 'Analyse globale' ? 'Voir l\'analyse régionale' : 'Voir l\'analyse globale'}
        </button>
    );
};

export default BtnAutreAnalyse;