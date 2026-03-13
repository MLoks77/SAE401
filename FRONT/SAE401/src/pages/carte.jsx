import React, { useState } from "react";
// composants

import Cartemodal from "../components/carte/Cartemodal";

import Navbar from "../components/navbar";
import BtnYear from "../components/carte/btnYear";
import Cartesvg from "../components/carte/cartesvg";
import "../css/carte.css";

const Carte = () => {

    const [selectedDpt, setSelectedDpt] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeYear, setActiveYear] = useState("2021"); //on choisit 2021 comme année par défaut

    const ClickDpt = (e) => {
        const target = e.target;
        // On vérifie si on a cliqué sur un chemin de département (id commençant par dpt-)
        if (target.tagName === 'path' && target.id && target.id.startsWith('dpt-')) {
            const dptId = target.id.replace('dpt-', '');
            const group = target.parentElement;
            // On récupère le nom du département dans la balise title du groupe parent
            const dptName = group && group.querySelector('title') ? group.querySelector('title').textContent : `Département ${dptId}`;

            setSelectedDpt({ id: dptId, name: dptName });
            setIsModalOpen(true);
        }
    };

    return (
        <div className="wrapper bg-[#1A1A20]">
            <Navbar />
            <BtnYear activeYear={activeYear} setActiveYear={setActiveYear} /> {/* on passe l'année en cours en props */}
            <Cartesvg ClickDpt={ClickDpt} />
            <div>
                <Cartemodal
                    isOpen={isModalOpen}
                    selectedDpt={selectedDpt}
                    activeYear={activeYear} // on passe l'année en cours en props ici aussi
                    onClose={() => setIsModalOpen(false)}
                />
            </div>

        </div>
    );
};

export default Carte;