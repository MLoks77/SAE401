import { Link } from 'react-router-dom';
// import Favicon from ''; 
// rajouter le favicon

const Navbar = () => {
    return (
        <nav className="bg-[#0A1420] flex items-center justify-center p-4">
            <div className="absolute left-4 hidden md:block">
                <img src="/favicon.ico" alt="Logo" className="w-8 h-8" />
            </div>
            <div className="tiktok-sans flex gap-4">
                <Link to="/" className="text-white p-2 font-semibold hoverbar">ANALYSE</Link>
                <Link to="/carte" className="text-white p-2 font-semibold hoverbar">CARTE</Link>
                <Link to="/gridCompar" className="text-white p-2 font-semibold hoverbar">COMPARER</Link>
                <Link to="/graphCreation" className="text-white p-2 font-semibold hoverbar">CRÉATION</Link>
            </div>
        </nav>
    );
};

export default Navbar;