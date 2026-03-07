import GraphCarte from "./GraphCarte"

const Cartemodal = ({ isOpen, selectedDpt, onClose }) => {
    // Si la modale n'est pas ouverte ou qu'aucun département n'est sélectionné, on n'affiche rien.
    if (!isOpen || !selectedDpt) return null;

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={onClose}
        >
            <div
                className="bg-[#2A2A35] border border-white/10 p-8 rounded-2xl shadow-2xl max-w-7xl w-full min-h-[50em] relative"
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

                {/* Titre de la modale montrant le nom du département sélectionné */}
                <h1 className="text-white font-bold uppercase text-xs mb-2">{selectedDpt.name}</h1>
                <hr className="border-white/10 mb-4" />

                <div className="flex-1">
                    <GraphCarte dptId={selectedDpt.id} />
                </div>
            </div>
        </div>
    );
};

export default Cartemodal;