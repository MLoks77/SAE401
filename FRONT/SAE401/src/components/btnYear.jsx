import { useState } from "react";
import SearchBar from "../components/Searchbar";

const BtnYear = () => {
    // https://stackoverflow.com/questions/72918094/how-can-i-update-class-name-with-usestate-to-activate-the-necessary-css-conditio
    // https://medium.com/geekculture/using-reacts-state-to-update-css-dynamically-c9b45570340c
    const years = ["2021", "2022", "2023"];
    const [activeYear, setActiveYear] = useState(years[0]); // Objet n°1 du tableau = année active

    const YearButton = () => {
        return years.map((y) => {

            const isActive = activeYear === y; // vérifie le btn actif

            return (
                <button
                    key={y}
                    className={`cursor-pointer text-white p-2 px-4 font-semibold rounded-full transition-colors ${isActive ? "bg-[#133479]" : "hover:bg-[#1A2A40]"}`} onClick={() => setActiveYear(y)}> {y}
                </button>
            );
        })
    }

    // y = année : 2021 2022...
    // key = id
    // map sert comme un for dans un tableau

    return (
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-between bg-[#152033] w-full p-4 gap-4">

            <nav className="flex items-center justify-center md:justify-start">
                <p className="text-[#D2D2D2] tiktok-sans px-2">Année :</p>
                <div className="flex border-[#384451] bg-[#131C30] border rounded-full">
                    <div className="p-1 flex gap-1">
                        {YearButton()}
                    </div>
                </div>
            </nav>

            <div className="w-full md:w-auto flex justify-center md:justify-end md:pr-4">
                <SearchBar />
            </div>

        </div>
    );
};

export default BtnYear;