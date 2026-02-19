import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer>
            <div className="flex justify-center items-center fixed bottom-0 w-full h-10 bg-[#133379] text-white">
                <p className='text-lg font-bold'>© {new Date().getFullYear()} SAE401 </p>
            </div>
        </footer>
    );
};

export default Footer;