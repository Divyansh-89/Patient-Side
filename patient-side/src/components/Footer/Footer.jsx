import React from 'react';
import './Footer.css'; 

const Footer = () => {
    return (
        <footer className="footer">
            <strong>&copy;</strong>
            <p>
                2025 CityCare Hospital. All rights reserved. |{' '}
                <span className="footer-link">Privacy Policy</span>
            </p>
        </footer>
    );
};

export default Footer;
