import React from 'react';
import "./Footer.css";
import { CiFacebook } from "react-icons/ci";
import { AiFillGithub } from "react-icons/ai";

const Footer = () => {
    return (
        <footer className="footer-distributed">

        <div className="footer-left">
            <h3>Mayas<span>Developer</span></h3>

            <p className="footer-links">
                <a href="#">Home</a>
                 |
                <a href="#">About</a>
                 |
                <a href="#">Contact</a>
                 |
                <a href="#">Blog</a>
            </p>

            <p className="footer-company-name">Copyright © 2023 <strong>Mayas Hasan</strong> All rights reserved</p>
        </div>

        <div className="footer-center">
            <div>
                <i className="fa fa-map-marker"></i>
                <p><span>Tartous</span>
                    Syria</p>
            </div>

            <div>
                <i className="fa fa-phone"></i>
                <p>+963**********</p>
            </div>
            <div>
                <i className="fa fa-envelope"></i>
                <p><a href="https://maias.hasan165@gmail.com">maias.hasan165@gmail.com</a></p>
            </div>
        </div>
        <div className="footer-right">
           
            <div className="footer-icons">
                <a href="#"><CiFacebook/></a>
                <a href="#"><AiFillGithub/></a>
              
            </div>
        </div>
    </footer>
    );
}

export default Footer;
