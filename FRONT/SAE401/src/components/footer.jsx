import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer>
            <div className="flex text-left py-2 fixed bottom-0 w-full bg-[#0A1420] text-white">
                <p className='text-md ml-5'>{new Date().getFullYear()} - SAE401 DATAVIZ </p>
            </div>
        </footer>
    );
};

export default Footer;