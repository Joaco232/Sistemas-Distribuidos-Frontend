import React from "react";
import "./Footer.css";
import Imagotipo from "../../assets/images/movienow-logo-w.png";

const Footer = ({className = "" }) => {
    return (
        <div className={`footer-mn ${className}`}>

            <div className="footer-text">

                <button className="terms-conditions-use footer-link">Terminos y Condiciones de uso</button>
                <button className="feedback footer-link">Feedback</button>
                <button className="contact footer-link">Contacto</button>

            </div>

            <img className="logo-footer" src={Imagotipo} alt="MovieNow logo"/>
        </div>
    );
};

export default Footer;