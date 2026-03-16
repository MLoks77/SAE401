import { useState } from "react";
import Navbar from "../components/navbar";
import BtnCriteres from "../components/Comparer/btnCriteres";

import Graphv1 from "../components/Comparer/graphv1";
import Graphv2 from "../components/Comparer/graphv2";

import favicon from "/favicon/favicon.ico";

const GridCompar = () => {
    // State pour la comparaison (remonté de BtnCriteres)
    const [selectedMetrique, setSelectedMetrique] = useState("");
    const [selectedValue1, setSelectedValue1] = useState("");
    const [selectedValue2, setSelectedValue2] = useState("");

    const loadCanva1 = () => {
        if (selectedValue1 !== "") {
            return <Graphv1 />;
        }
    };

    const loadCanva2 = () => {
        if (selectedValue2 !== "") {
            return <Graphv2 />;
        }
    };

    const notloaded = () => {
        return (
            <div className="m-auto text-center space-y-4">
                <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto">
                    <img src={favicon} alt="Logo" className="w-8 h-8" />
                </div>
                <p className="text-[#94a3b8] font-medium italic">Veuillez remplir les champs pour commencer la comparaison</p>
            </div>
        );
    };

    return (
        <div className="h-screen flex flex-col overflow-hidden bg-[#111822]">
            <Navbar></Navbar>
            <BtnCriteres
                selectedMetrique={selectedMetrique}
                setSelectedMetrique={setSelectedMetrique}
                selectedValue1={selectedValue1}
                setSelectedValue1={setSelectedValue1}
                selectedValue2={selectedValue2}
                setSelectedValue2={setSelectedValue2}
            />
            {selectedValue1 === "" && selectedValue2 === "" ? (
                notloaded()
            ) : (
                <div className="flex-1 flex flex-row mx-4 mb-4 gap-4 overflow-hidden">
                    <div className="flex-1 bg-[#1A2432] rounded-xl p-6 shadow-lg">
                        {loadCanva1()}
                    </div>
                    <div className="flex-1 bg-[#1A2432] rounded-xl p-6 shadow-lg">
                        {loadCanva2()}
                    </div>
                </div>
            )}
        </div>
    );
};

export default GridCompar;