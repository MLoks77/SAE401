import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer>
            <p>© {new Date().getFullYear()} SAE401</p>
        </footer>
    );
};

export default Footer;