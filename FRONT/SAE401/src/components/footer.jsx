import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer>
            <div className="flex justify-center items-center fixed bottom-0 w-full h-8 bg-[#0A1420] text-white">
                <p className='text-md'>{new Date().getFullYear()} - SAE401 DATAVIZ </p>
            </div>
        </footer>
    );
};

export default Footer;