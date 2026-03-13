import { NavLink, useLocation } from 'react-router-dom';
import favicon from "/favicon/favicon.ico";
import Searchbar from "./carte/Searchbar";

// navlink comparé à link permet de détecter la page actuel "conçu spécifiquement pour détecter si l'URL actuelle correspond au lien"

const Navbar = () => {
    const location = useLocation(); // renvoie l'endroit où le composant se trouve
    const showSearchBar = location.pathname === '/carte';

    const simple = "text-white p-2 font-semibold hoverbar"
    const active = "text-white p-2 font-semibold hoverbar ring-gray-200 ring-1 bg-gray-800"

    return (
        <nav className="bg-[#0A1420] flex items-center p-4">
            <div className="flex-1 flex items-center justify-start">
                <img src={favicon} alt="Logo" className="w-8 h-8" />
            </div>

            <div className="flex-1 flex items-center justify-center">
                {showSearchBar && <Searchbar />}
            </div>

            <div className="flex-1 flex items-center justify-end tiktok-sans gap-4">
                <NavLink to="/" className={({ isActive }) => isActive ? active : simple}>ANALYSE</NavLink>
                <NavLink to="/carte" className={({ isActive }) => isActive ? active : simple}>CARTE</NavLink>
                <NavLink to="/Comparaison" className={({ isActive }) => isActive ? active : simple}>COMPARER</NavLink>
                <NavLink to="/graphCreation" className={({ isActive }) => isActive ? active : simple}>CRÉATION</NavLink>
            </div>
        </nav>
    );
};

export default Navbar;