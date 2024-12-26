import {
  Navigation,
  Slider,
  Plans,
  AboutUs,
  Location,
  Specifications,
  Footer,
  Contact,
  Partners,
} from "./components";
import "./App.scss";

const slides = [
  {
    title: "Kompleks modernih kuća sa bazenom na",
    highlightedWord: "Avali",
    description:
      "Udobniji, kvalitetniji i zdraviji životu u raskošnoj prirodu Avalske planine nadomak Beograda. Sve kuće iz Avala Home Concept ponude modernog su dizajna i pružaju maksimalan komfor višečlanim porodicama.",
    image: "https://avalahomeconcept.com/assets/img/slide/slide-1.jpg",
  },
  {
    title: "Kompleks modernih kuća sa bazenom na",
    highlightedWord: "Avali",
    description:
      "Udobniji, kvalitetniji i zdraviji životu u raskošnoj prirodu Avalske planine nadomak Beograda. Sve kuće iz Avala Home Concept ponude modernog su dizajna i pružaju maksimalan komfor višečlanim porodicama.",
    image: "https://avalahomeconcept.com/assets/img/slide/slide-2.jpg",
  },
  {
    title: "Kompleks modernih kuća sa bazenom na",
    highlightedWord: "Avali",
    description:
      "Udobniji, kvalitetniji i zdraviji životu u raskošnoj prirodu Avalske planine nadomak Beograda. Sve kuće iz Avala Home Concept ponude modernog su dizajna i pružaju maksimalan komfor višečlanim porodicama.",
    image: "https://avalahomeconcept.com/assets/img/slide/slide-3.jpg",
  },
  {
    title: "Infinity bazen sa pogledom na",
    highlightedWord: "Avalski toranj",
    description:
      "Izgrađene na prelepom placu sa pogledom na veličanstveni Avalski toranj, naše kuće će učinite da Vaš dom bude prava oaza mira.",
    image:
      "https://avalahomeconcept.com/assets/img/portfolio/projekat-1-6.webp",
  },
];

function App() {
  return (
    <div className="app">
      <Navigation />
      <Slider slides={slides} />
      <AboutUs />
      <Plans />
      <Specifications />
      <Location />
      <Contact />
      <Partners />
      <Footer />
    </div>
  );
}

export default App;
