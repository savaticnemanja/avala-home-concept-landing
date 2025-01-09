import { ciricGradnjaLogo, ciricHomeInvestLogo } from "../../assets";
import "./AboutInvestor.scss";

export const AboutInvestor = () => {
  return (
    <section id="aboutus" className="about-us">
      <div className="about-us__left">
        <h1 className="about-us__title">O investitoru</h1>
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
      <div className="about-us__right">
        <div className="about-us__card">
          <img
            src={ciricHomeInvestLogo}
            alt="Ciric Gradnja"
            className="about-us__logo"
          />
          <div className="about-us__contact">
            <p>Phone: +381 11 1234567</p>
            <p>Email: info@cirichomeinvest.com</p>
            <a
              href="http://www.cirichomeinvest.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Website
            </a>
          </div>
        </div>
        <div className="about-us__card">
          <img
            src={ciricGradnjaLogo}
            alt="Home Invest"
            className="about-us__logo"
          />
          <div className="about-us__contact">
            <p>Phone: +381 11 7654321</p>
            <p>Email: info@ciricgradnja.com</p>
            <a
              href="http://www.ciricgradnja.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Website
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
