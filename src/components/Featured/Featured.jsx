import featuredImage from "../../assets/3.jpg";
import "./Featured.scss";

export const Featured = () => {
  return (
    <section className="featured">
      <div className="safe-zone">
        <img src={featuredImage} alt="" className="featured__image" />
        <div className="featured__text">
          <h2>Kompleks modernih kuća sa bazenom na Avali</h2>
          <p>
            Udobniji, kvalitetniji i zdraviji životu u raskošnoj prirodu Avalske planine nadomak Beograda. Sve kuće iz Avala Home Concept ponude modernog su dizajna i pružaju
            maksimalan komfor višečlanim porodicama. Izgrađene na prelepom placu sa pogledom na veličanstveni Avalski toranj, naše kuće će učinite da Vaš dom bude prava oaza mira.
          </p>
          <div className="featured__info-wrapper">
            <div className="featured__info">
              <h3>659</h3>
              <p>Square Areas</p>
            </div>
            <div className="featured__info">
              <h3>659</h3>
              <p>Square Areas</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
