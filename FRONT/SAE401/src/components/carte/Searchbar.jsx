import { useState, useEffect } from "react";
import { getDepartements } from "../../services/departementsService";

const SearchbarModal = () => {
    const [search, setSearch] = useState("");
    const [departements, setDepartements] = useState([]);

    // récup departements API
    useEffect(() => {
        const fetchDept = async () => {
            try {
                const response = await getDepartements();
                const data = response.data['hydra:member'] || response.data;
                setDepartements(data);
            } catch (error) {
                console.error("Erreur API départements :", error);
            }
        };
        fetchDept();
    }, []);

    useEffect(() => {
        const allPaths = document.querySelectorAll("path[id^='dpt-']"); // tous les path avec id commençant par "dpt-"
        allPaths.forEach(path => path.classList.remove("highlight-search")); // on enleve le orange sur tous les departements

        if (search.trim() !== "") {
            const searchLower = search.toLowerCase();

            // on filtre les departements pour trouver ceux qui correspondent soit par le code departement soit par le nom du departement
            const filtered = departements.filter((dept) => 
                String(dept.code_dept).toLowerCase().includes(searchLower) || 
                String(dept.nom_dept).toLowerCase().includes(searchLower)
            );

            // passe en orange les departements correspondants
            filtered.forEach(dept => {
                const pathId = `dpt-${dept.code_dept}`;
                const pathElement = document.getElementById(pathId);
                
                if (pathElement) {
                    pathElement.classList.add("highlight-search");
                }
            });
        }
    }, [search, departements]);

    return (
        <div className="flex items-center text-sm font-bold p-2 border border-white/30 rounded-md hover:bg-[#1A2A40] transition duration-300 cursor-pointer hover:border-white/40 px-6">
            <svg className="w-4 h-4 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" className="justify-center stroke-gray-400"/>
            </svg>
            <input 
                type="text" 
                value={search} 
                onChange={(event) => setSearch(event.target.value)} 
                placeholder="Rechercher un département" 
                className="text-gray-400 bg-transparent border-none outline-none cursor-pointer"
            />
        </div>
    );
};

export default SearchbarModal;