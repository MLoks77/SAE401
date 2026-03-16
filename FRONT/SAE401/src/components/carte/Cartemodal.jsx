import GraphCarte from "./GraphCarte"

const Cartemodal = ({ isOpen, selectedDpt, onClose, activeYear, setActiveYear }) => { 
    // Si la modale n'est pas ouverte ou qu'aucun département n'est sélectionné, on n'affiche rien.
    // on utilise le props activeYear pour selectionner les données de l'année en question apres
    if (!isOpen || !selectedDpt) return null;

    const years = ["2021", "2022", "2023"];

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={onClose}
        >
            <div
                className="bg-[#1F2937] border border-white/10 p-8 rounded-2xl shadow-2xl max-w-7xl w-full h-[85vh] flex flex-col relative"
                onClick={(e) => e.stopPropagation()}
            >
                
                {/* Bouton de fermeture */}
                <button
                    onClick={onClose}
                    className="cursor-pointer absolute top-4 right-4 text-gray-400 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-full"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>

                {/* Header : Titre | Sélecteur Année */}
                <div className="flex items-center justify-between mb-4 pr-12">
                    {/* Titre de la modale */}
                    <h1 className="text-white font-bold uppercase text-xs">
                        {selectedDpt.name} ({selectedDpt.id}) — Année {activeYear}
                    </h1>

                    {/* Sélecteur d'année au milieu */}
                    <nav className="flex items-center gap-3">
                        <p className="text-[#D2D2D2] text-[10px] font-bold uppercase tracking-wider">Année :</p>
                        <div className="flex border-[#384451] bg-[#131C30] border rounded-full p-1 gap-1">
                            {years.map((y) => {
                                const isActive = activeYear === y;
                                return (
                                    <button
                                        key={y}
                                        className={`cursor-pointer text-[10px] px-3 py-1 font-bold rounded-full transition-all duration-300 ${
                                            isActive 
                                            ? "bg-[#133479] text-white border border-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.3)]" 
                                            : "text-gray-400 hover:text-white hover:bg-[#1A2A40]"
                                        }`} 
                                        onClick={() => setActiveYear(y)}
                                    >
                                        {y}
                                    </button>
                                );
                            })}
                        </div>
                    </nav>

                    {/* Espace pour compenser le bouton de fermeture absolute à droite */}
                    <div className="w-4"></div>
                </div>

                <hr className="border-white/10 mb-6" />

                <div className="flex-1 flex flex-col min-h-0">
                    <GraphCarte dptId={selectedDpt.id} activeYear={activeYear} /> {/* on passe l'année en cours en props */}
                </div>
            </div>
        </div>
    );
};

export default Cartemodal;