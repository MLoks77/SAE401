
// bouton reset
const BtnReset = ({ reset }) => {
    return (
        <div className="p-4 bg-[#1A2432]">
            <button onClick={reset} className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-colors cursor-pointer active:scale-[0.98]">
                Réinitialiser
            </button>
        </div>
    );
};

export default BtnReset;
