import React from "react";
import './index.css';
import Logoa from "../images/logofa.png";


const Footer = () => (
  <div className="footer">
    <div className="container_navbar">
      <a className="nav_footer" href="#">HEM</a>
      <a className="nav_footer" href="#">PRODUKTER</a>
      <a className="nav_footer" href="#">KONTAKTER</a>
    </div>
    <a className="nav_footer_social" href='http://www.facebook.com' target='_blank'><img style={{height: 35, width: 35}}src={Logoa} alt="Facebook" /></a>
    <div className="adress">Adress: Jensens gata 33, Stockholm</div>
  </div>
);

export default Footer;