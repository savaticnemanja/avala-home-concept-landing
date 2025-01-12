import { showcase1, showcase2 } from "@/assets";
import { FaArrowCircleRight, FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Showcase.scss";

const descriptions = [
  {
    title: "Zdravo prirodno okruzenje",
    description: "Kuća na Avalskoj planini izolovana od gradske buke",
  },
  {
    title: "Nadomak Beograda",
    description: "Dobra saobraćajna povezanost sa centrom Beograda",
  },
  {
    title: "Dvoriste bazen i plaza",
    description: "Bazen sa kompletnom opremom, uređeno dvorište sa rasvetom",
  },
  {
    title: "Maksimalna bezbednost",
    description: "Sigurnosna aluminijumska vrata, kamere i alarm sistem",
  },
  { title: "Parking", description: "Parking mesto" },
];

export const Showcase = () => {
  return (
    <div className="showcase">
      <div className="showcase__image-container">
        <img src={showcase1} className="showcase__image" alt="" />
        <img src={showcase2} className="showcase__image" alt="" />
      </div>
      <div className="showcase__descriptions">
        {descriptions.map((item, index) => (
          <div key={index} className="showcase__description-item">
            <h3 className="showcase__description-title">
              <FaCheckCircle className="showcase__icon" />
              {item.title}
            </h3>
            <p className="showcase__description-text">{item.description}</p>
          </div>
        ))}
        <Link to="/specifications" className="showcase__button">
          Detaljna specifikacija
          <FaArrowCircleRight className="showcase__icon" />
        </Link>
      </div>
    </div>
  );
};
