import logo from "../../assets/logo.png";
import "./Navigation.scss";

export const Navigation = () => {
  return (
    <nav className="navigation">
      <div className="container safe-zone">
        <img src={logo} className="logo" />
        <ul className="nav-links">
          <li>Home</li>
          <li>About</li>
          <li>Services</li>
          <li>Contact</li>
        </ul>
        <button className="cta-button">Find a House</button>
      </div>
    </nav>
  );
};
