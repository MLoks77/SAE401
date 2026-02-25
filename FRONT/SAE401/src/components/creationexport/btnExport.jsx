import React from 'react';

const BtnExport = () => {
    return (
        <div className="p-6 border-t border-[#334155] bg-[#1A2432]">
            <button className="w-full bg-blue-800 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors cursor-pointer active:scale-[0.98]">
                Exporter la visualisation
            </button>
        </div>
    );
};

export default BtnExport;
