// bouton reset
const BtnReset = ({ reset }) => {
    return (
        <div className="p-2">
            <button onClick={reset} className="p-4 w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-lg transition-colors min-w-60 cursor-pointer active:scale-[0.98]">
                Réinitialiser
            </button>
        </div>
    );
};

export default BtnReset;