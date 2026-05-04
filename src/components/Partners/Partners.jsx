import {
  astralLogo,
  bekamentLogo,
  bracaMaricLogo,
  ciricHomeInvestLogo,
  fluidraLogo,
  geberitLogo,
  wienerbergerLogo,
} from "@/assets";
import "./Partners.scss";

const logos = [
  { src: astralLogo, alt: "Astral" },
  { src: bekamentLogo, alt: "Bekament" },
  { src: bracaMaricLogo, alt: "Braća Marić" },
  { src: ciricHomeInvestLogo, alt: "Ćirić Home Invest" },
  { src: fluidraLogo, alt: "Fluidra" },
  { src: geberitLogo, alt: "Geberit" },
  { src: wienerbergerLogo, alt: "Wienerberger" },
];

const doubled = [...logos, ...logos];

export const Partners = () => (
  <section className="partners" aria-label="Naši partneri">
    <div className="partners__track">
      {doubled.map((logo, i) => (
        <div key={i} className="partners__logo-container">
          <img src={logo.src} alt={logo.alt} className="partners__logo" loading="lazy" decoding="async" />
        </div>
      ))}
    </div>
  </section>
);
