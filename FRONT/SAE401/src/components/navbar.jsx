import { NavLink } from 'react-router-dom';
import favicon from "/favicon/favicon.ico";
// import Favicon from ''; 
// rajouter le favicon

// navlink comparé à link permet de détecter la page actuel "conçu spécifiquement pour détecter si l'URL actuelle correspond au lien"

const Navbar = () => {

    const simple = "text-white p-2 font-semibold hoverbar"
    const active = "text-white p-2 font-semibold hoverbar ring-gray-200 ring-1 bg-gray-800"

    return (
        <nav className="bg-[#0A1420] flex items-center justify-center p-4">
            <div className="absolute left-4 hidden md:block">
                <img src={favicon} alt="Logo" className="w-8 h-8" />
            </div>
            <div className="tiktok-sans flex gap-4"> {/*isActive est une prop de NavLink qui est true si le lien est actif et donc va appliquer une certaine classe*/}
                <NavLink to="/" className={({ isActive }) => isActive ? active : simple}>ANALYSE</NavLink>
                <NavLink to="/carte" className={({ isActive }) => isActive ? active : simple}>CARTE</NavLink>
                <NavLink to="/gridCompar" className={({ isActive }) => isActive ? active : simple}>COMPARER</NavLink>
                <NavLink to="/graphCreation" className={({ isActive }) => isActive ? active : simple}>CRÉATION</NavLink>
            </div>
        </nav>
    );
};

export default Navbar;