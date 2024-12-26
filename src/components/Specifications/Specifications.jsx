import "./Specifications.scss";

const features = [
  {
    title: "Čvrsta gradnja",
    description: "Armirano betonska konstrukcija",
  },
  {
    title: "Sanitarije",
    description:
      "Geberit ugradni sistem uz prateću galanteriju, staklene tuš kabine",
  },
  {
    title: "Grejanje",
    description:
      "Etažno, digitalni elektro kotao, skriveno radijatorsko grejanje. Toplotne pumpe (opciono)",
  },
  {
    title: "Fasada",
    description: "Prirodni materijali: drvo, keramika i kamen",
  },
  {
    title: "Bazen i plaža",
    description:
      "Bazen u dvorištu sa pogledom na Avalski toranj – bazen sa kompletnom propratnom opremom",
  },
  {
    title: "Thermo klima blok",
    description: "Broj 1. blok na tržištu",
  },
  {
    title: "Fasadna stolarija",
    description:
      "Aluminijumski prozori sa alu roletnama i dvostrukim staklom, punjeno argonom",
  },
  {
    title: "Unutrašnja vrata",
    description:
      "Medijapan presvučen CPL folijom sa dodatnim ojačanjima u štoku i krilu sa pervajz lajsnama",
  },
  {
    title: "Plafon",
    description: "Visina 2,70–2,90 m",
  },
  {
    title: "Termoizolacija",
    description: "Austrotherm – debljina 10 cm, debljina zida 30 cm",
  },
  {
    title: "Staklo",
    description: 'Climaguard solar "Guardian" (4 godišnja doba)',
  },
  {
    title: "Spoljna vrata",
    description: "Sigurnosna vrata sa zaključavanjem u 6 tačaka",
  },
  {
    title: "Uređeno dvorište",
    description:
      "Svuda se postavlja seme premium trave visokog kvaliteta bočno ograđivanjem",
  },
];

export const Specifications = () => {
  return (
    <section className="specifications">
      <div className="specifications__features">
        <h1 className="specifications__title">Specifikacije</h1>
        {features.map((feature, index) => (
          <div className="specifications__feature-row" key={index}>
            <div className="specifications__feature">
              <h4 className="specifications__feature-title">{feature.title}</h4>
              <p className="specifications__feature-description">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
