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
          <p>
            Porodica Ćirić već 30 godina uspešno gradi i posluje na tržištu
            Srbije. Naše građevinske kompanije Ćirić Home Invest i Ćirić gradnja
            iza sebe imaju više hiljada uspešno realizovanih projekata i
            zadovoljnih klijenata. Naše dugogodišnje iskustvo čini nas pouzdanim
            partnerom od poverenja koji ima znanje, stručnost i kadrove za
            realizaciju svih vrsta građevinskih radova brzo, kvalitetno i po
            dogovoru.
          </p>
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
              <Link to="/projects">Projekti</Link>
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
