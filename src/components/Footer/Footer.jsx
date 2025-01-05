import { Link } from "react-router-dom";
import {
  logo,
  facebookIcon,
  instagramIcon,
  linkedInIcon,
  footerImage1,
  footerImage2,
  footerImage3,
} from "../../assets";

import "./Footer.scss";
export const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__images-wrapper">
        <div className="footer__images">
          <img src={footerImage1} alt="" />
          <img src={footerImage2} alt="" />
          <img src={footerImage3} alt="" />
          <img src={footerImage1} alt="" />
          <img src={footerImage2} alt="" />
        </div>
      </div>
      <div className="footer__sections">
        <div className="footer__section">
          <img className="footer__logo" src={logo} alt="" />
        </div>
        <div className="footer__section">
          <h3>Sitemap</h3>
          <ul>
            <li>
              <Link to="/">Početna</Link>
            </li>
            <li>
              <Link to="/about-us">O nama</Link>
            </li>
            <li>
              <Link to="/projects">Ponuda kuća</Link>
            </li>
            <li>
              <Link to="/specifications">Specifikacije</Link>
            </li>
            <li>
              <Link to="/about-investor">O investitoru</Link>
            </li>
            <li>
              <Link to="/gallery">Galerija</Link>
            </li>
            <li>
              <Link to="/work-progress">Napredak radova</Link>
            </li>
            <li>
              <Link to="/contact">Kontakt</Link>
            </li>
          </ul>
        </div>
        <div className="footer__section">
          <h3>Follow us on socials</h3>
          <img
            className="footer__social-icon"
            src={facebookIcon}
            alt=""
            width="16px"
            height="16px"
          />
          <img
            className="footer__social-icon"
            src={instagramIcon}
            alt=""
            width="16px"
            height="16px"
          />
          <img
            className="footer__social-icon"
            src={linkedInIcon}
            alt=""
            width="16px"
            height="16px"
          />
        </div>
      </div>
      <p className="footer__copyright">Copyright &#169; Avala Home Concept</p>
    </div>
  );
};
