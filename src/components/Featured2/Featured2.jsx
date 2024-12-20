import featuredImage from "../../assets/3.jpg";
import "./Featured2.scss";

export const Featured2 = () => {
  return (
    <section className="featured2">
      <div className="safe-zone">
        <div className="featured2__text">
          <h2>Dom po Vašoj meri</h2>
          <p>
            Udobniji, kvalitetniji i zdraviji životu u raskošnoj prirodu Avalske planine nadomak Beograda. Sve kuće iz Avala Home Concept ponude modernog su dizajna i pružaju
            maksimalan komfor višečlanim porodicama. Izgrađene na prelepom placu sa pogledom na veličanstveni Avalski toranj, naše kuće će učinite da Vaš dom bude prava oaza mira.
          </p>
          <div className="featured2__info-wrapper"></div>
        </div>
        <img src={featuredImage} alt="" className="featured2__image" />
      </div>
    </section>
  );
};
