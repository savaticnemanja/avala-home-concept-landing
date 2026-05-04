import { facebookIcon, instagramIcon, linkedInIcon, logoWhite } from "@/assets";
import { Link } from "react-router-dom";
import "./Footer.scss";

const pagesLinks = [
  { path: "/", label: "Početna" },
  { path: "/about-us", label: "O nama" },
  { path: "/gallery", label: "Galerija" },
  { path: "/work-progress", label: "Napredak radova" },
  { path: "/about-investor", label: "O investitoru" },
  { path: "/contact", label: "Kontakt" },
];

const offerLinks = [
  { path: "/project1", label: "Projekat 1 — 139m²" },
  { path: "/project2", label: "Projekat 2 — 147m²" },
  { path: "/small-houses", label: "Kuće 80–100m²" },
  { path: "/specifications", label: "Specifikacije gradnje" },
];

const socials = [
  { href: "https://www.facebook.com/avalahomeconcept/", src: facebookIcon, alt: "Facebook" },
  { href: "https://www.instagram.com/avala_homeconcept/", src: instagramIcon, alt: "Instagram" },
  { href: "https://rs.linkedin.com/in/avala-home-concept-718984276", src: linkedInIcon, alt: "LinkedIn" },
];

export const Footer = () => (
  <footer className="footer">
    <div className="footer__body">

      <div className="footer__brand">
        <Link to="/">
          <img
            className="footer__logo"
            src={logoWhite}
            alt="Avala Home Concept logo"
            width="280"
            height="55"
          />
        </Link>
        <p className="footer__tagline">
          Zatvoren kompleks porodičnih kuća na Avalskoj planini — 20 minuta od Beograda.
        </p>
        <div className="footer__socials">
          {socials.map(({ href, src, alt }) => (
            <a key={alt} href={href} target="_blank" rel="noopener noreferrer" aria-label={alt}>
              <img className="footer__social-icon" src={src} alt={alt} width="16" height="16" />
            </a>
          ))}
        </div>
      </div>

      <div className="footer__nav">
        <div className="footer__nav-group">
          <p className="footer__nav-heading">Stranice</p>
          <ul>
            {pagesLinks.map(({ path, label }) => (
              <li key={path}><Link to={path}>{label}</Link></li>
            ))}
          </ul>
        </div>
        <div className="footer__nav-group">
          <p className="footer__nav-heading">Ponuda kuća</p>
          <ul>
            {offerLinks.map(({ path, label }) => (
              <li key={path}><Link to={path}>{label}</Link></li>
            ))}
          </ul>
        </div>
      </div>

      <div className="footer__contact">
        <p className="footer__nav-heading">Kontakt</p>
        <ul>
          <li>
            <a href="tel:+38163383393">
              <span className="footer__contact-label">Telefon</span>
              +381 63 383393
            </a>
          </li>
          <li>
            <a href="viber://contact/?number=+38163383393">
              <span className="footer__contact-label">Viber</span>
              +381 63 383393
            </a>
          </li>
          <li>
            <a href="https://wa.me/38163383393" target="_blank" rel="noopener noreferrer">
              <span className="footer__contact-label">WhatsApp</span>
              +381 63 383393
            </a>
          </li>
          <li>
            <a href="mailto:avalahomeconcept@gmail.com">
              <span className="footer__contact-label">Email</span>
              avalahomeconcept@gmail.com
            </a>
          </li>
          <li className="footer__contact-location">
            <span className="footer__contact-label">Lokacija</span>
            Avala, Beograd, Srbija
          </li>
        </ul>
      </div>

    </div>

    <div className="footer__bottom">
      <p>&#169; {new Date().getFullYear()} Avala Home Concept. Sva prava zadržana.</p>
      <p>Developed by <a href="https://nemanjas.dev" className="footer__signature" target="_blank" rel="noopener noreferrer">nemanjas.dev</a></p>
    </div>
  </footer>
);
