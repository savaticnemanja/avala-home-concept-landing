import logo from "../../assets/logo.png";
import "./Navigation.scss";

export const Navigation = () => {
  return (
    <nav className="navigation">
      <div className="container safe-zone">
        <img src={logo} className="logo" />
        <ul className="nav-links">
          <li>
            <a href="#home">Početna</a>
          </li>
          <li>
            <a href="#aboutus">O nama</a>
          </li>
          <li>
            <a href="#projects">Projekti</a>
          </li>
          <li>
            <a href="#specifications">Specifikacije</a>
          </li>
          <li>
            <a href="#location">Lokacija</a>
          </li>
          <li>
            <a href="#contact">Kontakt</a>
          </li>
        </ul>
        <a href="#contact">
          <button className="cta-button">ZAKAŽI POSETU</button>
        </a>
      </div>
    </nav>
  );
};
