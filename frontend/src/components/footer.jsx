// Footer.js
import React from 'react';


const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-about">
                    <h3>About Our Club</h3>
                    <p>We are a community-based swimming club dedicated to promoting swimming for all ages and skill levels.</p>
                </div>
                <div className="footer-links">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><a href="/home">Home</a></li>
                        <li><a href="/about">About Us</a></li>
                        <li><a href="/programs">Programs</a></li>
                        <li><a href="/contact">Contact Us</a></li>
                    </ul>
                </div>
                <div className="footer-contact">
                    <h3>Contact Us</h3>
                    <p>Email: info@swimmingclub.com</p>
                    <p>Phone: (123) 456-7890</p>
                    <p>Address: 123 Swim St, Swim City, SC 12345</p>
                </div>
                <div className="footer-social">
                    <h3>Follow Us</h3>
                    <ul>
                        <li><a href="https://facebook.com">Facebook</a></li>
                        <li><a href="https://twitter.com">Twitter</a></li>
                        <li><a href="https://instagram.com">Instagram</a></li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2024 Swimming Club. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
