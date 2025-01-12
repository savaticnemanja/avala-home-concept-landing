import { arrowDown } from "@/assets";
import logo from "@/assets/logo.png";
import { useState } from "react";
import { FaQuestionCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Navigation.scss";

const navLinks = [
  { path: "/", label: "Početna" },
  { path: "/about-us", label: "O nama" },
  {
    label: "Ponuda kuća",
    subLinks: [
      { path: "/project1", label: "Projekat 1" },
      { path: "/project2", label: "Projekat 2" },
    ],
  },
  { path: "/specifications", label: "Specifikacije" },
  { path: "/about-investor", label: "O investitoru" },
  { path: "/gallery", label: "Galerija" },
  { path: "/work-progress", label: "Napredak radova" },
  { path: "/contact", label: "Kontakt" },
];

export const Navigation = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);

  const handleMouseEnter = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleMouseLeave = () => {
    setDropdownVisible(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuVisible(!mobileMenuVisible);
  };

  return (
    <nav className="navigation">
      <div className="container safe-zone">
        <Link to="/">
          <img src={logo} className="logo" alt="Logo" />
        </Link>
        <button className="mobile-menu-icon" onClick={toggleMobileMenu}>
          <img
            src={mobileMenuVisible ? arrowDown : arrowDown}
            alt="Menu Icon"
          />
        </button>
        <ul className={`nav-links ${mobileMenuVisible ? "visible" : ""}`}>
          {navLinks.map((link) => (
            <li
              key={link.label}
              onMouseEnter={link.subLinks ? handleMouseEnter : null}
              onMouseLeave={link.subLinks ? handleMouseLeave : null}
              onClick={link.subLinks ? handleMouseEnter : null}
            >
              <Link to={link.path} onClick={toggleMobileMenu}>
                {link.label}
                {link.subLinks && (
                  <img
                    src={arrowDown}
                    className="arrow-down"
                    alt="Arrow Down"
                  />
                )}
              </Link>
              {link.subLinks && dropdownVisible && (
                <ul className="dropdown">
                  {link.subLinks.map((subLink) => (
                    <li key={subLink.label}>
                      <Link to={subLink.path}>{subLink.label}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
        <Link to="/contact" className="cta-link">
          <button className="cta-button">
            Zatraži ponudu
            <FaQuestionCircle />
          </button>
        </Link>
      </div>
    </nav>
  );
};
