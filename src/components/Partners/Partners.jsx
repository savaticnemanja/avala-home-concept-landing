import {
  astralLogo,
  bekamentLogo,
  bracaMaricLogo,
  ciricGradnjaLogo,
  fluidraLogo,
  geberitLogo,
  wienerbergerLogo,
} from "../../assets";
import "./Partners.scss";

export const Partners = () => {
  return (
    <section className="partners">
      <div className="partners__safe-zone">
        <div className="partners__scroll-container">
          <div className="partners__logos">
            <img src={astralLogo} alt="Partner 1" className="partners__logo" />
            <img
              src={bekamentLogo}
              alt="Partner 2"
              className="partners__logo"
            />
            <img
              src={bracaMaricLogo}
              alt="Partner 3"
              className="partners__logo"
            />
            <img
              src={ciricGradnjaLogo}
              alt="Partner 4"
              className="partners__logo"
            />
            <img src={fluidraLogo} alt="Partner 5" className="partners__logo" />
            <img src={geberitLogo} alt="Partner 5" className="partners__logo" />
            <img
              src={wienerbergerLogo}
              alt="Partner 5"
              className="partners__logo"
            />
            <img src={astralLogo} alt="Partner 1" className="partners__logo" />
            <img
              src={bekamentLogo}
              alt="Partner 2"
              className="partners__logo"
            />
            <img
              src={bracaMaricLogo}
              alt="Partner 3"
              className="partners__logo"
            />
            <img
              src={ciricGradnjaLogo}
              alt="Partner 4"
              className="partners__logo"
            />
            <img src={fluidraLogo} alt="Partner 5" className="partners__logo" />
            <img src={geberitLogo} alt="Partner 5" className="partners__logo" />
            <img
              src={wienerbergerLogo}
              alt="Partner 5"
              className="partners__logo"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
